import "react-native";
import React from "react";
import ArticleSummary from "./article-summary";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ArticleSummary />).toJSON();

  expect(tree).toBeTruthy();
});
