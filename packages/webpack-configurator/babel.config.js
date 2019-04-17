module.exports = api => {
  api.cache(true);
  return {
    plugins: ["transform-es2015-modules-commonjs", "syntax-object-rest-spread"]
  };
};
