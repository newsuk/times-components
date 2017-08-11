/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Link from "./link";

it("renders correctly", () => {
  const tree = renderer.create(<Link />).toJSON();

  expect(tree).toMatchSnapshot();
});
