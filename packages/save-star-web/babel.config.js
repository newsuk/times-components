module.exports = api => {
  api.cache(true);
  return {
    plugins: ["babel-plugin-styled-components"],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: true
          }
        }
      ],
      "@babel/preset-react"
    ]
  };
};