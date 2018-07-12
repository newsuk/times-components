import React from "react";
import RelatedArticles from "../src/related-articles";
import opinionAndTwo1ArticleFixture from "../fixtures/opinionandtwo/1-article";
import { createRelatedArticlesProps, testSummary } from "./shared-util";

const opinionAndTwo1ArticleFixtureData = opinionAndTwo1ArticleFixture({
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
        {...createRelatedArticlesProps(
          opinionAndTwo1ArticleFixtureData,
          events
        )}
      />
    );

    expect(output).toMatchSnapshot("1. should render the default styles");
  });
};
