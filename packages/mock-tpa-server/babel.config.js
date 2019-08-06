module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-react-display-name",
      "babel-plugin-transform-react-remove-prop-types"
    ],
    presets: ["module:metro-react-native-babel-preset"]
  };
};
