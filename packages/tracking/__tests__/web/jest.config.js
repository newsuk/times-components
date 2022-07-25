const jestConfigurator = require("@times-components/jest-configurator-web")
  .default;

const jc = jestConfigurator(__dirname, {
  coverageIgnoreGlobs: ["tracking-context-types.js", "tracking.js"]
});
jc.preset = "ts-jest";
jc.globals = {
  "ts-jest": {
    tsConfigFile: "./tsconfig.jest.json"
  }
};

module.exports = jc;