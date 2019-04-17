module.exports = api => {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "react-dom/server":
              "./node_modules/react-apollo/react-apollo.browser.umd.js"
          }
        }
      ],
      "babel-plugin-styled-components",
      require.resolve("@babel/plugin-transform-react-display-name"),
      require.resolve("@babel/plugin-proposal-class-properties"),
      require.resolve("@babel/plugin-transform-runtime"),
      require.resolve("@babel/plugin-proposal-export-default-from")
    ]
  };
};
