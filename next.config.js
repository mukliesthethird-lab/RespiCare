const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
  reactStrictMode: true,
  compress: true,
  webpack: (config, { isServer }) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];

    // Fix for better-sqlite3 in Next.js
    if (isServer) {
      config.externals.push('better-sqlite3');
    }

    return config;
  },
});
