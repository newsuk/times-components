module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime"
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true,
            node: "current"
          }
        }
      ],
       "@babel/preset-react"]
  };
};
