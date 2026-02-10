/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 80, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mysbrkriwelivdpkknbq.supabase.co",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
