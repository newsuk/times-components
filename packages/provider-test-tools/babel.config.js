module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-export-default-from",
      "import-graphql",
      "@babel/plugin-proposal-class-properties"
    ],
    presets: ["@babel/preset-env", "@babel/preset-react"]
  };
};
