import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // When you move to Vercel Blob, add the blob hostname here:
    // remotePatterns: [
    //   { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    // ],
  },
};

export default nextConfig;
