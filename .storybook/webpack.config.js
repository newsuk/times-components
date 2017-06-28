module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [require("babel-plugin-transform-class").default]
          }
        }
      }
    ]
  },

  resolve: {
    // Maps the 'react-native' import to 'react-native-web'.
    alias: {
      "react-native": "react-native-web",
      "@storybook/react-native": "@storybook/react"
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.ios.js', '.android.js']
  }
};
