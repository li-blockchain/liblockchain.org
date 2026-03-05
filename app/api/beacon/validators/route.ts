import { NextRequest, NextResponse } from 'next/server'

// Beacon chain API URLs per network
const BEACON_API_URLS: Record<number, string> = {
  1: 'https://beaconcha.in',
  560048: 'https://hoodi.beaconcha.in',
}

// API key from environment variable
const BEACONCHAIN_API_KEY = process.env.BEACONCHAIN_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const chainId = searchParams.get('chainId')
  const withdrawalCredentials = searchParams.get('withdrawalCredentials')

  if (!chainId || !withdrawalCredentials) {
    return NextResponse.json(
      { error: 'Missing required parameters: chainId and withdrawalCredentials' },
      { status: 400 }
    )
  }

  if (!BEACONCHAIN_API_KEY) {
    return NextResponse.json(
      { error: 'Beacon chain API key not configured. Set BEACONCHAIN_API_KEY in .env.local' },
      { status: 500 }
    )
  }

  const chainIdNum = parseInt(chainId, 10)
  const baseUrl = BEACON_API_URLS[chainIdNum]

  if (!baseUrl) {
    return NextResponse.json(
      { error: `Unsupported chain ID: ${chainId}` },
      { status: 400 }
    )
  }

  try {
    // Step 1: Get list of validators by withdrawal credentials
    const wcUrl = `${baseUrl}/api/v1/validator/withdrawalCredentials/${withdrawalCredentials}?apikey=${BEACONCHAIN_API_KEY}`
    console.log(`[Beacon API Proxy] Fetching validators by withdrawal credentials...`)

    const wcResponse = await fetch(wcUrl, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 30 },
    })

    if (!wcResponse.ok) {
      if (wcResponse.status === 404) {
        return NextResponse.json({ status: 'OK', data: [] })
      }
      console.error(`[Beacon API Proxy] Error: ${wcResponse.status} ${wcResponse.statusText}`)
      return NextResponse.json(
        { error: `Beacon API error: ${wcResponse.status} ${wcResponse.statusText}` },
        { status: wcResponse.status }
      )
    }

    const wcData = await wcResponse.json()

    if (wcData.status !== 'OK' || !wcData.data || wcData.data.length === 0) {
      return NextResponse.json({ status: 'OK', data: [] })
    }

    // Get validator indices from the response
    const validators = Array.isArray(wcData.data) ? wcData.data : [wcData.data]
    const indices = validators.map((v: { validatorindex: number }) => v.validatorindex).join(',')

    console.log(`[Beacon API Proxy] Found ${validators.length} validators, fetching details for indices: ${indices}`)

    // Step 2: Get full validator details by indices
    const detailsUrl = `${baseUrl}/api/v1/validator/${indices}?apikey=${BEACONCHAIN_API_KEY}`
    const detailsResponse = await fetch(detailsUrl, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 30 },
    })

    if (!detailsResponse.ok) {
      console.error(`[Beacon API Proxy] Details error: ${detailsResponse.status}`)
      // Fall back to basic data if details fetch fails
      return NextResponse.json(wcData)
    }

    const detailsData = await detailsResponse.json()
    console.log('[Beacon API Proxy] Full validator details:', JSON.stringify(detailsData, null, 2))

    return NextResponse.json(detailsData)
  } catch (error) {
    console.error('[Beacon API Proxy] Fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch from beacon chain API' },
      { status: 500 }
    )
  }
}
