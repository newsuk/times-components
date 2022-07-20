module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-transform-react-display-name",
      [
        "@babel/transform-runtime",
        {
          regenerator: true
        }
      ]
    ],
    presets: ["@babel/preset-react", "@babel/preset-env"]
  };
};
