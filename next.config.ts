import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                hostname: "image.eveonline.com",
            }
        ]
    }
};

export default nextConfig;
