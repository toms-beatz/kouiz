/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
      config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.plugins = [...config.plugins,
      new webpack.DefinePlugin({
        '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
      })
    ]
    // Important: return the modified config
    return config
  },
  reactStrictMode: false,
};

export default nextConfig;
