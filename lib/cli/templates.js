const handlebars = require("handlebars");

const packageJson = require("./package-json");

const indexFile = handlebars.compile(`import React from "react";
import { Text } from "react-native";
import styles from "./styles";

const {{{component}}} = () => (
  <Text style={styles.{{{component}}}Body}>{{{component}}}</Text>
);

export default {{{component}}};
`);

const showcaseFile = handlebars.compile(`import React from "react";
import {{{component}}} from "./src/{{{packageName}}}";

export default {
  name: "{{{component}}}",
  children: [
    {
      type: "story",
      name: "{{{component}}}",
      component: () => <{{{component}}} />
    }
  ]
};
`);

const storyFile = handlebars.compile(`import { showcaseConverter } from "@times-components/storybook";
import showcase from "./{{{packageName}}}.showcase";

showcaseConverter(module, showcase);
`);

const testsFile = handlebars.compile(`import React from "react";
import TestRenderer from "react-test-renderer";
import {{{component}}} from "../src/{{{packageName}}}";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <{{{component}}} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
`);

const testEsLintConfigFile = handlebars.compile(`{
  "env": {
    "jest": true
  }
}
`);

const testContainerFile = handlebars.compile(`import shared from "../shared";

shared();
`);

const jestConfigFile = platform =>
  handlebars.compile(`const jestConfigurator = require("@times-components/jest-configurator").default;

module.exports = jestConfigurator("${platform}", __dirname);
`);

const styleShared = handlebars.compile(`const sharedStyle = {
  {{{component}}}Body: {
    padding: 20
  }
};

export default sharedStyle;
`);

const styleIndex = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles
});

export default styles;
`);

const styleWeb = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "blue"
  }
});

export default styles;
`);

const styleAndroid = handlebars.compile(`import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  {{{component}}}Body: {
    ...sharedStyles.{{{component}}}Body,
    color: "green"
  }
});

export default styles;
`);

const packageJsonFile = variables =>
  `${JSON.stringify(packageJson(variables), null, 2)}\n`;

module.exports = variables => [
  [indexFile, `src/${variables.packageName}.js`],
  [testsFile, `__tests__/shared.js`],
  [testEsLintConfigFile, `__tests__/.eslintrc.json`],
  [jestConfigFile("android"), `__tests__/android/jest.config.js`],
  [jestConfigFile("ios"), `__tests__/ios/jest.config.js`],
  [jestConfigFile("web"), `__tests__/web/jest.config.js`],
  [testContainerFile, `__tests__/android/${variables.packageName}.test.js`],
  [testContainerFile, `__tests__/ios/${variables.packageName}.test.js`],
  [testContainerFile, `__tests__/web/${variables.packageName}.test.js`],
  [styleShared, `src/styles/shared.js`],
  [styleIndex, `src/styles/index.js`],
  [styleWeb, `src/styles/index.web.js`],
  [styleAndroid, `src/styles/index.android.js`],
  [showcaseFile, `${variables.packageName}.showcase.js`],
  [storyFile, `${variables.packageName}.stories.js`],
  [packageJsonFile, "package.json"]
];
