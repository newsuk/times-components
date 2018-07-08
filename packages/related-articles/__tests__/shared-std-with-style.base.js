import React from "react";
import RelatedArticles from "../src/related-articles";
import standard1ArticleFixture from "../fixtures/standard/1-article";

const testSummary = [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "Summary 125"
        },
        children: []
      }
    ]
  }
];

const standard1ArticleFixtureData = standard1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  summary125: testSummary
}).data;

const createRelatedArticlesProps = (
  fixtureData,
  action = () => {},
  onPress = () => {}
) => ({
  analyticsStream: action,
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
  mainId: fixtureData.relatedArticlesLayout.main,
  onPress
});

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
