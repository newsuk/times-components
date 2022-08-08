module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime"
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true
          }
        }
      ],
      "@babel/preset-react"
    ]
  };
};
