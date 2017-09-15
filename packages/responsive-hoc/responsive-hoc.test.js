/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ResponsiveStyleHOC from "./responsive-style-hoc";

it("renders correctly", () => {
  const tree = renderer.create(<ResponsiveStyleHOC />).toJSON();

  expect(tree).toMatchSnapshot();
});
