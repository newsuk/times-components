/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleList from "./article-list";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleList />).toJSON();

  expect(tree).toBeTruthy();
});

it("renders a snapshot", () => {
  const tree = renderer.create(<ArticleList />).toJSON();

  expect(tree).toMatchSnapshot();
});
