module.exports = api => {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "babel-plugin-styled-components",
      require.resolve("@babel/plugin-transform-react-display-name"),
      require.resolve("@babel/plugin-proposal-class-properties"),
      require.resolve("@babel/plugin-transform-runtime"),
      require.resolve("@babel/plugin-proposal-export-default-from")
    ]
  };
};
