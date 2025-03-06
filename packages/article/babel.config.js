module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-export-default-from"
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
