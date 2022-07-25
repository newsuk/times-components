const jestConfigurator = require("@times-components/jest-configurator-web")
  .default;

const jc = jestConfigurator(__dirname, {
  coverageIgnoreGlobs: [
    "article-content.js",
    "article-lead-asset-image.js",
    "article-lead-asset-video.js",
    "data-helper.js"
  ]
});
jc.preset = "ts-jest";
jc.globals = {
  "ts-jest": {
    tsConfigFile: "./tsconfig.jest.json"
  }
};

module.exports = jc;
