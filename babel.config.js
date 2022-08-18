module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-transform-modules-commonjs"
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
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  };
};
