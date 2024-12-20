import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.externals.push('esbuild', 'vite', '@babel/preset-typescript/package.json', 'vite-plugin-singlefile')
    return config
  },
};

export default nextConfig;
