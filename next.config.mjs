/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'appetizing-pleasure-a679a7b137.media.strapiapp.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
