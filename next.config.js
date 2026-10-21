/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a test build use its own folder (NEXT_DIST_DIR=.next-check) so it
  // never clashes with a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

module.exports = nextConfig;
