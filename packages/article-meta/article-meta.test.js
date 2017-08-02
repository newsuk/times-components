/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleMeta from "./article-meta";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleMeta />).toJSON();

  expect(tree).toMatchSnapshot();
});
