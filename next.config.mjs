/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '',
            pathname: '/jk-strapi-cms/**',
          },
          {
            protocol: 'https',
            hostname: 'jjqiucyavgbuvasxsznv.supabase.co',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
