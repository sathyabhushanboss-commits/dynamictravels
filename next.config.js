/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a test build use its own folder (NEXT_DIST_DIR=.next-check) so it
  // never clashes with a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  compress: true,
  // Let browsers/CDNs cache images and icons instead of re-downloading them
  // on every visit. A day fresh + a week of background revalidation, so a
  // replaced image (same file name) still shows up within a day.
  async headers() {
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }];
    return [
      { source: '/images/:path*', headers: cache },
      { source: '/:file(icon-192.png|icon-512.png|og-image.jpg)', headers: cache },
    ];
  },
};

module.exports = nextConfig;
