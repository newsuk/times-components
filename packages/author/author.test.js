/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Author from "./author";

it("renders correctly", () => {
  const tree = renderer.create(<Author />).toJSON();

  expect(tree).toMatchSnapshot();
});
