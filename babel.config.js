module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-export-default-from"
    ],
    presets:["@babel/preset-flow", "@babel/preset-react"]
  };
};
