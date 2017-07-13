/* eslint-env jest */

import "react-native";
import React from "react";
import ArticleSummary from "../article-summary";
import props from "../fixtures/article.json";
import withIntl from "./with-intl";

it("renders a snapshot", () => {
  const tree = withIntl(<ArticleSummary />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders a snapshot with content", () => {
  const tree = withIntl(<ArticleSummary {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
