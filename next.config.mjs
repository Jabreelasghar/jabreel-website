/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/frameworks",
        destination: "/resources",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
