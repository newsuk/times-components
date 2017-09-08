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
import Foo from "./foo";

storiesOf("Foo", module).add("Foo", () => <Foo />);
`);

const testFile = handlebars.compile(`/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {{{component}}} from "./{{{packageName}}}";

it("renders correctly", () => {
  const tree = renderer.create(<{{{component}}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
`);

const packageJsonFile = variables =>
  JSON.stringify(packageJson(variables), null, 2);

module.exports = variables => [
  [indexFile, `${variables.packageName}.js`],
  [testFile, `${variables.packageName}.test.js`],
  [storyFile, `${variables.packageName}.stories.js`],
  [packageJsonFile, "package.json"]
];
