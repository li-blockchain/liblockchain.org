import { NextRequest, NextResponse } from 'next/server'
import { extractVaultReport, isValidCid, VaultReportError } from '@/lib/vaultReport'

/**
 * Returns one vault's leaf + Merkle proof from a Lido stVaults oracle report.
 *
 *   GET /api/vault-report?cid=<report CID>&root=<tree root>&vault=<vault address>
 *
 * The client reads the CID and root from LazyOracle.latestReportData() and
 * passes both in. We fetch the report from public IPFS gateways here rather than
 * in the browser because the gateways rate-limit aggressively and vary a lot in
 * latency; doing it server-side gives us fallbacks and a cache.
 *
 * Nothing here needs to be trusted: the client re-verifies the proof against
 * the on-chain root, and LazyOracle verifies it again. A wrong answer can only
 * make the update transaction fail simulation.
 *
 * `root` is what makes the response safe to cache. A gateway is not guaranteed
 * to return the content a CID names, and a 200 here is cached as immutable — so
 * a response is only accepted (and only cached) when the report's own root
 * equals the root the caller asked for. A gateway serving something else cannot
 * poison the entry for the real (cid, root, vault).
 */

export const runtime = 'nodejs'

// Raced concurrently; the first gateway to return the expected report wins.
const IPFS_GATEWAYS = [
  'https://ipfs.filebase.io/ipfs',
  'https://gateway.pinata.cloud/ipfs',
  'https://ipfs.io/ipfs',
  'https://dweb.link/ipfs',
]

// One deadline for the whole lookup. The endpoint is unauthenticated, so a
// request for a CID nobody pins must not hold a function open for long.
const FETCH_DEADLINE_MS = 6_000
// A report is ~0.5 KB per vault (11 KB at 23 vaults). This is a ceiling
// against an arbitrary CID being used to pull large content through us.
const MAX_REPORT_BYTES = 2 * 1024 * 1024

// Verified reports, per warm server instance, keyed by cid:root.
const reportCache = new Map<string, unknown>()
const REPORT_CACHE_ENTRIES = 4

async function readBodyCapped(response: Response): Promise<string> {
  const declared = Number(response.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > MAX_REPORT_BYTES) {
    throw new Error('report too large')
  }
  if (!response.body) throw new Error('empty body')

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_REPORT_BYTES) {
      await reader.cancel()
      throw new Error('report too large')
    }
    chunks.push(value)
  }
  return Buffer.concat(chunks).toString('utf8')
}

function hasRoot(report: unknown, root: string): boolean {
  const tree = (report as { tree?: unknown } | null)?.tree
  return Array.isArray(tree) && typeof tree[0] === 'string' && tree[0].toLowerCase() === root
}

async function fetchReport(cid: string, root: string): Promise<unknown> {
  const key = `${cid}:${root}`
  const cached = reportCache.get(key)
  if (cached) return cached

  const controller = new AbortController()
  const deadline = setTimeout(() => controller.abort(), FETCH_DEADLINE_MS)

  try {
    const report = await Promise.any(
      IPFS_GATEWAYS.map(async (gateway) => {
        const response = await fetch(`${gateway}/${cid}`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
          cache: 'no-store',
        })
        if (!response.ok) throw new Error(`${gateway}: HTTP ${response.status}`)
        const parsed: unknown = JSON.parse(await readBodyCapped(response))
        // Only a response carrying the expected root can win the race.
        if (!hasRoot(parsed, root)) throw new Error(`${gateway}: unexpected content`)
        return parsed
      })
    )

    if (reportCache.size >= REPORT_CACHE_ENTRIES) {
      const oldest = reportCache.keys().next().value
      if (oldest !== undefined) reportCache.delete(oldest)
    }
    reportCache.set(key, report)
    return report
  } catch (error) {
    const reasons =
      error instanceof AggregateError
        ? error.errors.map((e) => (e instanceof Error ? e.message : String(e)))
        : [String(error)]
    console.error('[vault-report] no gateway returned the expected report for', cid, reasons)
    throw new Error('IPFS gateways unavailable')
  } finally {
    clearTimeout(deadline)
    controller.abort() // stop the losers
  }
}

function json(body: unknown, status: number, cacheControl = 'no-store') {
  return NextResponse.json(body, { status, headers: { 'cache-control': cacheControl } })
}

export async function GET(request: NextRequest) {
  const cid = request.nextUrl.searchParams.get('cid') ?? ''
  const vault = request.nextUrl.searchParams.get('vault') ?? ''

  const root = (request.nextUrl.searchParams.get('root') ?? '').toLowerCase()

  if (!isValidCid(cid)) return json({ error: 'Invalid report CID' }, 400)
  if (!/^0x[a-f0-9]{64}$/.test(root)) return json({ error: 'Invalid report root' }, 400)
  if (!/^0x[a-fA-F0-9]{40}$/.test(vault)) return json({ error: 'Invalid vault address' }, 400)

  let report: unknown
  try {
    report = await fetchReport(cid, root)
  } catch {
    return json({ error: 'Could not fetch the oracle report from IPFS. Try again shortly.' }, 502)
  }

  try {
    const data = extractVaultReport(report, vault, cid)
    return json({ data }, 200, 'public, max-age=31536000, immutable')
  } catch (error) {
    if (error instanceof VaultReportError && error.code === 'vault-not-found') {
      return json({ error: 'Vault is not in this oracle report', code: 'vault-not-found' }, 404)
    }
    // It carried the right root but is not a report we understand; don't keep it.
    reportCache.delete(`${cid}:${root}`)
    console.error('[vault-report] unusable report', cid, error)
    return json({ error: 'Oracle report could not be read' }, 422)
  }
}
