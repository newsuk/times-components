module.exports = api => {
  api.cache(true);
  return {
    plugins: ["@babel/plugin-proposal-object-rest-spread"]
  };
};

