/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleSummary from "../article-summary";
import props from "../fixtures/article.json";

it("renders an article-summary component", () => {
  const tree = renderer.create(<ArticleSummary />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders an article-summary component with content", () => {
  props.date = new Date("2017-07-01T14:32:00.000Z");
  const tree = renderer.create(<ArticleSummary {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
