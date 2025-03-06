module.exports = api => {
  api.cache(true);
  return {
    plugins: ["babel-plugin-styled-components", "transform-class-properties"],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: false,
            node: "current"
          }
        }
      ],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  };
};
