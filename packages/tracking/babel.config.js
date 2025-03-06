module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-class-properties"
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current"
          }
        }
      ],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  };
};
