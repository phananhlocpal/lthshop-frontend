/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*'
              },
              {
                key: 'Access-Control-Allow-Methods', 
                value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: '*'
              },
              {
                key: 'Access-Control-Allow-Credentials',
                value: 'true'
              }
            ]
          }
        ]
      }
};

export default nextConfig;
