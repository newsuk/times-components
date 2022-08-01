module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      'babel-plugin-styled-components'
    ],
    presets: ["@babel/preset-env", '@babel/preset-react']
  };
};
