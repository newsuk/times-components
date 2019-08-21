module.exports = api => {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-transform-react-display-name",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-export-default-from"
    ]
  };
};
