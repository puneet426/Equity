/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
};
export default nextConfig;
