import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import PullQuoteContent from "../../src/styles/responsive";

describe("PullQuote responsive components tests on web", () => {
  it("should render PullQuoteContent correctly", () => {
    expect(renderer.create(<PullQuoteContent />).toJSON()).toMatchSnapshot();
  });
});
