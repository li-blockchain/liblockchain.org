# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js application. Common development commands:

- `pnpm dev` - Start development server (localhost:3000)
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

Note: This project uses pnpm as the package manager.

## Architecture Overview

This is a Next.js-based website for Long Island Blockchain (liblockchain.org) with the following structure:

### Tech Stack
- **Framework**: Next.js 14 with React 18 and TypeScript
- **Styling**: Tailwind CSS with custom brand colors (cyan, purple, slate)
- **Web3**: Wagmi v2, Viem, RainbowKit for wallet connections
- **Data Fetching**: TanStack React Query for async state management
- **Forms**: Formik for form handling
- **UI Components**: Heroicons, hamburger-react for mobile menu

### Directory Structure
- `pages/` - Next.js Pages Router (public marketing pages)
  - `index.js` - Homepage with hero, projects, services, and contact sections
  - `eth-staking.js` - Ethereum staking service page
  - `institutional-staking.js` - Whitelabel validators & institutional staking for enterprises
  - `staking-vaults.js` - Liquidity-enabled staking vaults (Lido v3 stVault) landing page
  - `community-wifi.js` - Community WiFi/Neutral Host service page
  - `privacy.js` - Privacy policy page
  - `api/` - API routes (contains post-lead.js for form submissions)
- `app/` - Next.js App Router (authenticated vault management app)
  - `layout.tsx` - Root layout with providers
  - `providers.tsx` - Wagmi/RainbowKit providers
  - `app/` - Vault management pages (all under `/app/*` URL)
    - `page.tsx` - Redirects to `/app/my-vaults`
    - `layout.tsx` - Vault pages layout with sidebar
    - `VaultSidebarClient.tsx` - Left sidebar navigation
    - `NavigationClient.tsx` - Top navigation with wallet connection
    - `my-vaults/` - View all user's private staking vaults (`/app/my-vaults`)
    - `create-vault/` - Create new private staking vault (`/app/create-vault`)
    - `vault-status/` - View individual vault details (`/app/vault-status`)
- `components/` - Reusable React components
  - `Navigation.tsx` - Main navigation with mobile hamburger menu and RainbowKit wallet connection
  - `VaultSidebar.tsx` - Legacy sidebar (pages router version)
  - `ContactForm.jsx` - Contact form component using Formik
  - `EmbeddedContactForm.jsx` - Embedded version of contact form
  - `StakingFeature.jsx` - Staking-related feature component
  - `NetworksGrid.jsx` - Grid display of supported blockchain networks
  - `StatsSection.jsx` - Statistics/metrics display section
  - `TrustIndicators.jsx` - Trust badges and credibility indicators
  - `ui/` - shadcn/ui components (Button, Card, Badge, etc.)
- `lib/` - Utility functions and configurations
  - **`chains.ts`** - Custom blockchain network configurations (Hoodi testnet, local Anvil)
  - **`wagmi.ts`** - Wagmi/RainbowKit configuration
  - **`utils.ts`** - Utility functions (cn for className merging)
  - **`contracts/`** - Smart contract ABIs and addresses
    - `vaultFactory.ts` - Vault factory contract configuration
    - `dashboard.ts` - Dashboard contract configuration
- `public/` - Static assets (images, logos, etc.)

### Key Features
- Responsive design with mobile-first approach
- Hero section with background images
- Project showcase section
- Services section (Training, Development, Consulting)
- Contact forms integrated throughout the site
- Mobile navigation with hamburger menu

### Styling Approach
- Uses Tailwind CSS extensively with custom theme extensions
- Background images configured in tailwind.config.js
- Custom CSS modules for specific styling (styles/Home.module.css)
- Responsive breakpoints: mobile-first with lg: prefix for desktop

### Form Handling
- Uses Formik for form management
- API endpoint at `/api/post-lead.js` handles form submissions
- Contact forms appear in multiple locations (hero, navigation, dedicated sections)

### Business Context
Long Island Blockchain is a consultancy focused on Web3 development, education, and blockchain services since 2016. The site showcases their projects (NFT platforms, token creation tools, payment splitting) and services (training, development, consulting).

## Private Staking Vault Application

The site includes a private Ethereum staking vault management application that allows users to create and manage custom staking vaults.

### Vault Features
- **Create Vault**: Users can deploy private staking vaults on-chain via the VaultFactory contract
- **My Vaults**: View all vaults created by the connected wallet address
- **Vault Status**: Monitor individual vault metrics including:
  - Total capacity and used capacity
  - Validator count and maximum validators
  - Operator information and addresses
  - Vault and dashboard contract addresses

### UI/UX Design
- **Left Sidebar Navigation**: Vault management pages use a fixed left sidebar (320px width) with:
  - "My Vaults" - View all user's vaults
  - "Create Vault" - Deploy a new vault
  - Solid cyan active state (no gradients per design preference)
  - Mobile responsive with hamburger toggle
- **Layout**: Main content offset by `lg:pl-80` to accommodate sidebar
- **Text Alignment**: Left-aligned text on vault pages (not centered)
- **Brand Colors**: Cyan (#0099cc) and purple accents, slate gray for text

### Network Configuration
- **Hoodi Testnet** (Chain ID: 560048): Primary network for testing
  - RPC: http://libc-testnets:8545 (local) or Alchemy
  - Lido's testnet environment

### Network Detection
- App detects which network the user's wallet is connected to
- Shows helpful error message if connected to wrong network
- Displays expected vs current chain ID
- Only fetches vault data when on correct network

### Smart Contracts
- **VaultFactory**: Deploys new vaults and dashboards
  - Emits `DashboardCreated` events when vaults are created
  - Events are queried to discover user's vaults
- **Vault**: Individual staking vault contract
- **Dashboard**: Vault management and monitoring interface

### Known Issues

⚠️ **RPC Selection Based on User's Network**
- Currently hardcoded to use Hoodi testnet RPC (http://libc-testnets:8545)
- Does NOT automatically select the correct RPC based on which network the user's wallet is connected to
- If user connects to a different network, the app still tries to query the hardcoded RPC
- **TODO**: Implement proper RPC selection that uses the user's connected network instead of hardcoded values
- This causes issues when users try to connect to networks other than Hoodi testnet