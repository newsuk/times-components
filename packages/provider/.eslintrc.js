module.exports = {
  extends: ["@times-components/thetimes"],
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaJson: require("@times-components/schema/schema.json")
      }
    ]
  },
  plugins: ["graphql"]
};
