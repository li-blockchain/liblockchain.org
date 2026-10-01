---
title: "Why We Validate Aztec: Privacy as Infrastructure for Ethereum"
description: "Privacy is what Ethereum needs before real commerce moves on-chain. Why Long Island Blockchain runs an Aztec sequencer, and what ZK.money's relaunch says about where private payments are headed."
date: "2026-10-01"
author: "Long Island Blockchain"
tags:
  - "Staking Operations"
cta:
  label: "Explore Institutional Staking"
  href: "/institutional-staking"
---

Privacy is what Ethereum needs before real commerce moves on-chain, and Aztec is the most serious attempt to provide it. That's why Long Island Blockchain runs an Aztec sequencer, signing blocks for the network alongside our Ethereum validators.

When you pay someone on Ethereum today, you give them far more than the payment. They can see your balance, your history and everyone you have ever paid. It's like handing a cashier your bank statement every time you buy coffee.

This week Aztec Labs relaunched **ZK.money**, a private, non-custodial payments app built on the Aztec network. CEO Joe Andrews walked through it on the Milk Road Crypto podcast. The product is new, but the network under it has been running for a while, and we have been part of it.

## Why blockchains are public by default

Public-by-default isn't a design flaw. It's what makes consensus possible. Thousands of independent nodes have to agree on who owns what, and to check a transfer they have to see it: the sender's balance, the amount, the recipient.

Zero-knowledge proofs change what the nodes need to see. Instead of publishing "100 minus 10 is 90," the sender publishes a mathematical proof that the transaction follows the rules. Every node can verify the proof without learning the amounts or the parties.

Andrews compares it to HTTPS. Before the padlock in your browser, nobody typed a card number into a website. Encryption didn't replace the internet; it made commerce on it possible. ZK proofs do the same for public blockchains.

## What Aztec is

Aztec is a decentralized Layer 2 on Ethereum that runs private programs, not just private transfers. Developers write contracts in Noir, Aztec's ZK programming language, and choose which state is public and which is encrypted.

The Zcash comparison makes the difference clear. Zcash is one asset with one private action: sending it. Aztec is a general-purpose platform in the way Ethereum is. It can host any number of applications and any number of assets, with privacy built in. ZK.money is one such application, launching with support for ETH, USDC, USDT and DAI.

The first ZK.money taught Aztec that lesson. It reached about 75,000 wallets and $100M in volume. But every new feature meant upgrading the network itself and hand-writing low-level proofs. The new Aztec fixes both problems. Anyone can deploy a program, and no single company runs the network.

**Why an L2 and not its own chain?** Andrews gives two reasons. Ethereum already has the strongest consensus a programmable chain can get, and rebuilding that from scratch is a second hard problem on top of privacy. And privacy only matters where economic activity happens. Sitting next to Ethereum means a private swap can route through Uniswap and a private savings vault can use Aave or Morpho, with no bridging.

## Who benefits, and how

Andrews' framing is the one we agree with most: privacy enables products; it isn't the product.

**Individuals.** Every data breach that leaks KYC records makes it easier to link a name to a wallet and a balance. That link is what drives the physical "wrench attacks" on crypto holders, seen most recently in France. Private balances break the link. ZK.money also removes the usual friction: passkeys instead of seed phrases, @tags instead of hex addresses, and no gas to manage.

**Businesses and institutions.** Corporate finance runs on information asymmetry: supplier pricing, positions, trading intent. No treasury desk will put that on a public ledger. Aztec gives institutions the building blocks, and ZK-based KYC (Aztec's ZK Passport) lets them prove compliance without building another honeypot of identity data. Andrews is candid that the remaining gap is regulatory clarity, not technology.

**AI agents.** You wouldn't hand an agent a private key and walk away. Programmable private payments let you set the rules it must follow instead. A payment can only be created if, for example, a DKIM-signed invoice arrived from an approved vendor and the bank account matches one you've paid before. A hallucinating agent can't do much damage inside those rules.

The common thread is **conditional logic you'd never put on a public chain**. You can't bind a payment to a passport or an email address on Ethereum today, because the passport or email would be public too. On Aztec it isn't.

## Our role: running an Aztec sequencer

Long Island Blockchain has run an Aztec sequencer since **June 26, 2026**, when we staked into the network's validator set on Ethereum mainnet. As of September 21, 2026, it had signed **over 1,000 attestations with zero failures**.

We run it the way we run our Ethereum validators:

- **Dedicated infrastructure.** The sequencer runs on its own host, backed by our own fully synced Ethereum execution and consensus clients, with no third-party RPC in the critical path.
- **Monitoring that catches the real failure.** "Host is up" isn't enough. We alert when the sequencer stops advancing with the chain, which catches a stalled node on a healthy machine.
- **The same team, the same discipline.** We've been in this space since founding as a Long Island meetup in 2016. Today we operate Ethereum validators across native staking, Rocket Pool, Obol, Lido CSM and Lido v3 stVaults, and every validator has a public on-chain record anyone can check.

Our working thesis is the one Andrews lays out. Institutions won't move serious capital on-chain until they can do it privately, and the operators who already run privacy infrastructure will be the ones they call.

## What sequencers actually do

The AZTEC token is what keeps the network decentralized, and sequencers are where that happens. Operators stake AZTEC to join the validator set. They earn rewards for producing and attesting to blocks correctly, and they face economic penalties if they misbehave.

Every Aztec transaction pays its fee in AZTEC. Part of each fee is burned, and the rest goes to the sequencers and provers who produce blocks and post proofs to Ethereum. ZK.money users never see this, because fee abstraction lets them hold dollars while the app pays network fees in the background.

Decentralization matters more for a privacy network than almost anywhere else. Andrews points to the history: the encryption export wars, and the current Tornado Cash cases. A privacy layer run by one company is one subpoena away from not being private. A network run by roughly 4,500–5,000 independent nodes around the world is not. We're one of them.

## The bottom line

Ethereum gave the world a programmable, neutral settlement layer. Aztec adds the confidentiality that real businesses need to use it. We think that combination is how institutional capital finally moves on-chain, and we're running the infrastructure for it today.

If you're an institution looking at staking or private on-chain infrastructure and want an operator with a verifiable track record, [get in touch](https://libc.fi). To try private payments yourself, ZK.money is live at [launch.zk.money](https://launch.zk.money).
