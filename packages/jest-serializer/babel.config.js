module.exports = api => {
  api.cache(true);
  return {
    plugins: ["@babel/plugin-proposal-object-rest-spread"],
    presets: ["@babel/preset-env", "module:metro-react-native-babel-preset"]
  };
};
