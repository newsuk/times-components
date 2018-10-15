import React from "react";
import mockDate from "mockdate";
import RelatedArticles from "../src/related-articles";
import standard1ArticleFixture from "../fixtures/standard/1-article";
import { createRelatedArticlesProps, testSummary } from "./shared-util";

const standard1ArticleFixtureData = standard1ArticleFixture({
  crop169: "https://crop.io",
  headline: "Test Headline",
  label: "test label",
  section: "thedish",
  shortHeadline: "Test Short Headline",
  summary125: testSummary(125),
  url: "https://test.io"
}).data;

export default renderComponent => {
  const realIntl = Intl;

  beforeEach(() => {
    mockDate.set(1514764800000, 0);
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    mockDate.reset();
    global.Intl = realIntl;
  });

  it("default styles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard1ArticleFixtureData, events)}
      />
    );

    expect(output).toMatchSnapshot();
  });
};
