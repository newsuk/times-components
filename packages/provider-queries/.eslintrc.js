module.exports = {
  extends: ["@times-components/thetimes"],
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
