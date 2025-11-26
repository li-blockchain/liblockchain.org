/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
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
