/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'taftclothing.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
    async headers() {
        return [
          {
            source: "/api/(.*)",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET,POST,PUT,DELETE,OPTIONS",
              },
              {
                key: "Access-Control-ALlow-Headers",
                value: "Content-Type, Authorization",
              },
              {
                key: "Content-Range",
                value: "bytes : 0-9",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
