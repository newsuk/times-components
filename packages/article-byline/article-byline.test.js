/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleByline from "./article-byline";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleByline />).toJSON();

  expect(tree).toMatchSnapshot();
});
