module.exports = api => {
  api.cache(true);
  return {
    plugins: ["@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-transform-react-display-name",
              "@babel/plugin-transform-flow-strip-types"],
    presets: ["@babel/preset-react"]
  };
};
