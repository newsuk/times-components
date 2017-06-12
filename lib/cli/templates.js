"use strict";

const handlebars = require("handlebars");

const packageJson = require("./package-json");

const indexFile = handlebars.compile(`import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
});

export default function {{{component}}} () {
  return (
    <Text>{{{component}}}</Text>
  );
};
`);

const storyFile = handlebars.compile(`import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import {{{component}}} from "./{{{packageName}}}";

storiesOf("{{{component}}}", module)
  .add("{{{component}}}", () => (
    <{{{component}}} />
  ));
`);

const testFile = handlebars.compile(`import "react-native";
import React from "react";
import {{{component}}} from "./{{{packageName}}}";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(
    <{{{component}}} />
  ).toJSON();

  expect(tree).to.exist;
});
`);

const packageJsonFile = (variables) =>
  JSON.stringify(packageJson(variables), null, 2);

module.exports = variables => [
  [ indexFile, variables.packageName + ".js" ],
  [ testFile, variables.packageName + ".test.js" ],
  [ storyFile, variables.packageName + ".stories.js" ],
  [ packageJsonFile, "package.json" ],
];

