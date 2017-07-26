/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleFlag from "./article-flag";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleFlag />).toJSON();

  expect(tree).toMatchSnapshot();
});
