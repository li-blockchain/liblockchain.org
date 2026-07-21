---
title: "Redefining ETH Staking: Our First Look at Lido V3's Modular Architecture"
description: "What we learned integrating Lido V3's new stVault system — predeposit formatting, Merkle proofs, node operator guarantees, and why this unlocks a new design space for Ethereum staking."
date: "2025-05-27"
author: "Long Island Blockchain"
tags:
  - "stVaults & Lido V3"
cta:
  label: "Explore Staking Vaults"
  href: "/staking-vaults"
originalUrl: "https://paragraph.com/@long-island-blockchain/redefining-eth-staking-our-first-look-at-lido-v3-s-modular-architecture"
---

Over the past few weeks, we've been deep in the weeds exploring Lido V3 and its newly introduced stVault system, which opens the door to a far more modular and trust-minimized approach to Ethereum staking. At Long Island Blockchain, the timing couldn't have been better — it came just as Ethereum's Pectra upgrade went live, reshaping what's possible in validator infrastructure.

## The Vision

Lido V3 brings to life a permissionless framework for validators to stake ETH and manage withdrawal credentials via on-chain vaults. This shift enables node operators and developers to build entirely new staking products while preserving Lido's strong economic alignment.

As staking infrastructure builders, we saw this as a leap forward. But getting there came with a bit of a learning curve.

## The Challenges

Here's what we ran into while integrating with Lido V3 — and how we got through it.

### 1. Predeposit Formatting Requirements

**Problem:** Lido's untrusted route requires node operators to prove that the validator exists on the consensus layer before depositing the full 32 ETH. As we typically deposit 32 ETH for a full validator, we mistakenly generated deposit data for 32 ETH and manually trimmed it down to 1 ETH, which caused signature checks to silently fail. On top of that, the standard Ethereum deposit CLI JSON output didn't align with what Lido's staking CLI expects.

**Solution:** Using ethstakers deposit CLI, we regenerated the deposit JSON using the correct 1 ETH configuration from the start, ensuring the deposit data and signatures aligned properly with Lido's validation logic.

### 2. Merkle Proofs and Consensus Inclusion

**Problem:** To finalize validator inclusion, we had to generate a Merkle proof showing our validator's presence in a recent beacon state root. This was new territory — it was our first time needing to use the beacon root contract and generate a proof about data on the consensus layer.

**Solution:** We leveraged the Lido CLI tool, which includes robust logic for creating Merkle proofs against a recent beacon root. Reading through the codebase, which has great comments, gave us a deeper understanding of how inclusion proofs are constructed and verified on-chain.

### 3. Node Operator Guarantee Timing

**Problem:** Lido V3 introduces a node operator guarantee, where node operators stake their own ETH upfront as a commitment. If this guarantee wasn't set before submitting the predeposit transactions, the vault setup would fail silently — no clear error, just a broken flow.

**Solution:** We called `setNodeOperatorGuarantee` early in the process and then used `topUp()` to fund the vault before initiating deposits. This ensured the vault was initialized correctly with all required conditions met.

### 4. RPC and Chain Sync Errors

**Problem:** While testing, we encountered intermittent RPC timeouts and inconsistent data between our execution and consensus clients. This was caused by an out-of-sync Hoodi node, which we had unknowingly used to fork our local testnet — resulting in stale state and unreliable behavior.

**Solution:** We fully resynced the execution client and verified that both consensus and execution layers were using the most recent state. This stabilized our test environment and eliminated sync-related errors.

## Why This Matters

This wasn't just about integrating a new staking interface, it was about unlocking a new design space.

With Lido V3, we now have:

- **Composable vaults:** Custom staking flows tailored to institutional, retail, or programmatic use cases.
- **Shared withdrawal contracts:** Smart contract–based exits and partial withdrawals that remove operational overhead.
- **New economic primitives:** Greater control over delegation, fee routing, validator behavior, and staking strategies.

Combined with the Pectra upgrade, which introduced MaxEB and validator consolidation, we're entering a new phase in Ethereum's validator lifecycle — one that's leaner, more scalable, and innovation-ready.

## What's Next for LIBC

At Long Island Blockchain, we're building the next layer on top of this foundation:

- **A managed staking product** that enables users to delegate to secure, vault-backed validators — leveraging our high-performance infrastructure with on-chain transparency.
- **Smart contracts for reward distribution**, ideal for DAOs, multisigs, or enterprise treasuries needing granular reward flows.
- **A hybrid custodial/non-custodial staking model**, blending compliance features, vault logic, and slashing insurance for regulated environments.

## Final Thoughts

The path wasn't easy. Documentation, tooling, and concepts are developing. This is the bleeding-edge! But the payoff is undeniable. Lido V3 isn't just a protocol upgrade — it's a platform shift.

We're proud to be early builders in this new chapter of Ethereum staking.

And we're just getting started. Look for some videos on our [YouTube channel](https://www.youtube.com/c/LongIslandBlockchain) outlining this flow.
