module.exports = {
  extends: ["@times-components-native/thetimes"],
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaJson: require("@times-components-native/schema/schema.json")
      }
    ]
  },
  plugins: ["graphql"]
};
