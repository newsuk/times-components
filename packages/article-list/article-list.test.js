import "react-native";
import React from "react";
import ArticleList from "./article-list";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleList />).toJSON();

  expect(tree).to.exist;
});
