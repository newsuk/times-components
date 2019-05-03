module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/mock-*/**",
          "**/__tests__/**",
          "**/*.test.*",
          "**/fixtures/**",
          "**/*.stories*",
          "**/*.showcase*",
          "**/showcase-helper*",
          "**/scripts/**",
          "webpack.config*.js"
        ],
        optionalDependencies: false
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["url"],
        aspects: ["noHref", "invalidHref", "preferButton"]
      }
    ],
    "no-restricted-properties": [
      2,
      {
        object: "React",
        property: "Component",
        message: "Please destruct Component from React."
      },
      {
        object: "React",
        property: "PureComponent",
        message: "Please destruct PureComponent from React."
      }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".android.js", ".ios.js", ".web.js"]
      }
    }
  },
  root: true
};
