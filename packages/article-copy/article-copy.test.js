/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleCopy from "./article-copy";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleCopy />).toJSON();

  expect(tree).toMatchSnapshot();
});
