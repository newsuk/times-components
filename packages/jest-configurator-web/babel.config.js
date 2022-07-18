module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-transform-react-display-name"
    ],
    presets: ["@babel/preset-react", "@babel/preset-env"]
  };
};
