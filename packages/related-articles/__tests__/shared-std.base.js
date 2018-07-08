import React from "react";
import mockDate from "mockdate";
import { shallow } from "enzyme";

import RelatedArticles from "../src/related-articles";
import RelatedArticleItem from "../src/related-article-item";

import standard1ArticleFixture from "../fixtures/standard/1-article";
import standard2ArticlesFixture from "../fixtures/standard/2-articles";
import standard3ArticlesFixture from "../fixtures/standard/3-articles";

const testSummary = summary => [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: `Summary ${summary}`
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
  summary125: testSummary(125)
}).data;

const standard2ArticlesFixtureData = standard2ArticlesFixture({
  firstCrop169: "https://crop1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondUrl: "https://second.io"
}).data;

const standard3ArticlesFixtureData = standard3ArticlesFixture({
  firstCrop169: "https://crop1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondUrl: "https://second.io",
  thirdCrop169: "https://crop3.io",
  thirdHeadline: "Third Headline",
  thirdSummary125: testSummary(125),
  thirdSummary145: testSummary(145),
  thirdUrl: "https://third.io"
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

  it("callback triggered on related article press", () => {
    const onRelatedArticlePress = jest.fn();
    const article = standard1ArticleFixtureData.relatedArticles[0];

    const wrapper = shallow(
      <RelatedArticleItem article={article} onPress={onRelatedArticlePress} />
    );

    const eventMock = {};
    wrapper
      .find("Link")
      .at(0)
      .simulate("press", eventMock);

    expect(onRelatedArticlePress).toHaveBeenCalledWith(eventMock, {
      url: article.url
    });
  });

  it("should render no related articles", () => {
    const events = jest.fn();

    const data = {
      relatedArticles: [],
      relatedArticlesLayout: {
        template: "DEFAULT"
      }
    };
    const output = renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(data, events)} />
    );

    expect(output).toMatchSnapshot("1. should render no related articles");
  });

  it("should send analytics even when no related articles", () => {
    const events = jest.fn();

    const data = {
      relatedArticles: [],
      relatedArticlesLayout: {
        template: "DEFAULT"
      }
    };

    renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(data, events)} />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "1a. should send analytics even when no related articles"
    );
  });

  it("should render a single related article", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard1ArticleFixtureData, events)}
      />
    );

    expect(output).toMatchSnapshot("2. render a single related article");
  });

  it("should send analytics for a single related article", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard1ArticleFixtureData, events)}
      />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "2a. should send analytics for a single related article"
    );
  });

  it("should render two related articles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard2ArticlesFixtureData, events)}
      />
    );

    expect(output).toMatchSnapshot("3. render two related articles");
  });

  it("should send analytics for two related articles", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard2ArticlesFixtureData, events)}
      />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "3a. should send analytics for two related articles"
    );
  });

  it("should render three related articles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard3ArticlesFixtureData, events)}
      />
    );
    expect(output).toMatchSnapshot("4 should render three related articles");
  });

  it("should send analytics for three related articles", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(standard3ArticlesFixtureData, events)}
      />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "4a. should send analytics for three related articles"
    );
  });
};
