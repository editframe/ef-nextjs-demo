const nextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.externals.push(
      "vite",
      "vite-tsconfig-paths",
      "vite-plugin-singlefile",
      "@vitejs/plugin-react"
    );
    return config;
  },
};

export default nextConfig;
