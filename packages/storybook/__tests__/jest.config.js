const jestConfigurator = require("@times-components/jest-configurator-web")
  .default;

const jc = jestConfigurator(__dirname, ["decorators.js", "storybook.js"]);
jc.preset = "ts-jest";
jc.globals = {
  "ts-jest": {
    tsConfigFile: "./tsconfig.jest.json"
  }
};

module.exports = jc;
