module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
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
