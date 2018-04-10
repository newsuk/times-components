module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  plugins: ["flowtype"],
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
          "**/*.showcase*",
          "**/scripts/**"
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
