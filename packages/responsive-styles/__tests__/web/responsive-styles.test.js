/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import withResponsiveStyles from "../../responsive-styles";

it("renders correctly", () => {
  const Enhanced = withResponsiveStyles("div");
  const tree = renderer.create(<Enhanced>Test</Enhanced>).toJSON();

  expect(tree).toMatchSnapshot();
});
