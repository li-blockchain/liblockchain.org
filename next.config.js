/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Bundle Pages Router dependencies into the server build, as the App Router
  // already does. Left external, _app's wagmi/viem imports make Node open
  // viem's ~700 chain definition files at once, which exceeds the file
  // descriptor limit on Netlify's functions (EMFILE -> 500 on every page).
  bundlePagesRouterDependencies: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // The app prompts wallet transactions, so it must never render inside
          // another site's frame (clickjacking). Relax frame-ancestors only if
          // the app is deliberately listed as a Safe App.
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog/:slug', destination: '/insights/:slug', permanent: true },
    ];
  },
  transpilePackages: [
    '@rainbow-me/rainbowkit',
    '@walletconnect/ethereum-provider',
    '@reown/appkit'
  ],
  webpack: (config, { dev, isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Disable source maps in production to avoid "Unexpected end of JSON input" errors
    if (!dev) {
      config.devtool = false;
    }

    // @coinbase/cdp-sdk (pulled in by wagmi's Base Account connector) imports its
    // optional x402 payment peers unconditionally. They are not installed and the
    // payment path is unused here, so resolve them to empty modules.
    config.resolve.alias = {
      ...config.resolve.alias,
      '@x402/core': false,
      '@x402/evm': false,
      '@x402/svm': false,
      '@x402/extensions': false,
      '@x402/express': false,
      '@x402/fetch': false,
    };

    // Handle optional React Native dependency for MetaMask SDK
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
