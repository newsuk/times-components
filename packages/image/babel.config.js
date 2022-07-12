module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-transform-react-display-name",
      "@babel/plugin-transform-flow-strip-types"
    ],
    presets:["@babel/preset-react"]
  };
};
 