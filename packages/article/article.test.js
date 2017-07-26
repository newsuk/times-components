/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "./article";

it("renders correctly", () => {
  const tree = renderer.create(<Article />).toJSON();

  expect(tree).toMatchSnapshot();
});
