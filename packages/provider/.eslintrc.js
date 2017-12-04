module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/__tests__/**",
          "**/*.test.*",
          "**/fixtures/**",
          "**/*.stories*",
          "**/scripts/**"
        ],
        optionalDependencies: false
      }
    ],
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaJson: require("@times-components/utils/schema.json")
      }
    ]
  },
  plugins: ["graphql"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".android.js", ".ios.js", ".web.js"]
      }
    }
  },
  root: true
};
