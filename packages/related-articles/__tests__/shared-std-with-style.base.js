import React from "react";
import RelatedArticles from "../src/related-articles";
import standard1ArticleFixture from "../fixtures/standard/1-article";
import { createRelatedArticlesProps, testSummary } from "./shared-util";

const standard1ArticleFixtureData = standard1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  summary125: testSummary(125)
}).data;

export default renderComponent => {
  it("should render the default styles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard1ArticleFixtureData, events)}
      />
    );

    expect(output).toMatchSnapshot("1. should render the default styles");
  });
};
