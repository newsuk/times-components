const handlebars = require("handlebars");

const packageJson = require("./package-json");

const indexFile = handlebars.compile(`import React from "react";
import { Text } from "react-native";

export default function {{{component}}}() {
  return <Text>{{{component}}}</Text>;
}
`);

const storyFile = handlebars.compile(`import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import {{{component}}} from "./{{{packageName}}}";

storiesOf("{{{component}}}", module).add("{{{component}}}", () => (
  <{{{component}}} />
));
`);

const testFile = handlebars.compile(`/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {{{component}}} from "../{{{packageName}}}";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<{{{component}}} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
`);

const testFileNative = (platform) => handlebars.compile(`/* eslint-env jest */

import shared from "../shared";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "${platform}";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.${platform} || obj.default);
  return reactNative;
});

jest.mock("WebView", () => "WebView");

describe("{{{component}}} test on ${platform}", () => {
  shared();
});`);

const testFileWeb = handlebars.compile(`/* eslint-env jest */

import shared from "../shared";

describe("{{{component}}} test on web", () => {
  shared();
});
`)

const jestConfigFile = (platform) => handlebars.compile(`const jestConfigurator = require("@times-components/jest-configurator");

module.exports = jestConfigurator("{{{packageName}}}", "${platform}");`)

const packageJsonFile = variables =>
  JSON.stringify(packageJson(variables), null, 2);

module.exports = variables => [
  [indexFile, `${variables.packageName}.js`],
  [testFile, `__tests__/shared.js`],
  [jestConfigFile('android'), `__tests__/android/jest.config.js`],
  [jestConfigFile('ios'), `__tests__/ios/jest.config.js`],
  [jestConfigFile('web'), `__tests__/web/jest.config.js`],
  [testFileNative('android'), `__tests__/android/${variables.packageName}.test.js`],
  [testFileNative('ios'), `__tests__/ios/${variables.packageName}.test.js`],
  [testFileWeb, `__tests__/web/${variables.packageName}.test.js`],
  [storyFile, `${variables.packageName}.stories.js`],
  [packageJsonFile, "package.json"]
];
