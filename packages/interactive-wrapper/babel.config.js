module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components"
    ],
    presets: ["module:metro-react-native-babel-preset"]
  };
};
