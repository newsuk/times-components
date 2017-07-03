import "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import ArticleSummary from "./article-summary";
import renderer from "react-test-renderer";

it("renders a snapshot", () => {
  const tree = renderer.create(<ArticleSummary />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a snapshot with content and styles", () => {
  const style = StyleSheet.create({
    headline: {
      color: "red"
    }
  });

  const props = {
    label: "Camilla Long",
    headline: "OK, so Putin’s not a lady, but he does have the wildest man‑PMT",
    date: "Sunday June 11 2017",
    publication: "The Sunday Times",
    text:
      "When I was the official celebrity sex correspondent on Style magazine, every so often I would have to address the abject failure of male...  ",
    style
  };
  const tree = renderer.create(<ArticleSummary {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
