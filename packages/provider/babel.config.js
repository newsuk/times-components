module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "babel-plugin-styled-components",
      "transform-class-properties",
      "@babel/plugin-proposal-export-default-from"
    ],
    presets: [[
      "@babel/preset-env",
      {
        targets: {
          esmodules: true
        }
      }
    ], "@babel/preset-react"]
  };
};


// module.exports = api => {
//   api.cache(true);
//   return {
//     plugins: [
//       "babel-plugin-styled-components",
//       "@babel/plugin-transform-react-display-name"
//     ],
//     presets: ["module:metro-react-native-babel-preset"]
//   };
// };

// module.exports = api => {
//   api.cache(true);
//   return {
//     plugins: ["babel-plugin-styled-components"],
    // presets: [
    //   [
    //     "@babel/preset-env",
    //     {
    //       targets: {
    //         esmodules: true
    //       }
    //     }
    //   ],
    //   "@babel/preset-react"
//     ]
//   };
// };
