/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleSummary from "./article-summary";

it("renders a snapshot", () => {
  const tree = renderer.create(<ArticleSummary />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a snapshot with content", () => {
  const props = {
    label: "Camilla Long",
    headline: "OK, so Putin’s not a lady, but he does have the wildest man‑PMT",
    date: "Sunday June 11 2017",
    publication: "The Sunday Times",
    text:
      "When I was the official celebrity sex correspondent on Style magazine, every so often I would have to address the abject failure of male...  "
  };
  const tree = renderer.create(<ArticleSummary {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
