import React from "react";
import RelatedArticles from "../src/related-articles";
import leadAndTwo1ArticleFixture from "../fixtures/leadandtwo/1-article";
import { createRelatedArticlesProps, testSummary } from "./shared-util";

const leadAndTwo1ArticleFixtureData = leadAndTwo1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  summary125: testSummary(125),
  summary160: testSummary(160)
}).data;

export default renderComponent => {
  it("should render the default styles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo1ArticleFixtureData, events)}
      />
    );

    expect(output).toMatchSnapshot("1. should render the default styles");
  });
};
