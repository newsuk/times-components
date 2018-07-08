import React from "react";
import mockDate from "mockdate";
import { shallow } from "enzyme";

import RelatedArticles from "../src/related-articles";
import RelatedArticleItem from "../src/related-article-item";

import opinionAndTwo1ArticleFixture from "../fixtures/opinionandtwo/1-article";
import opinionAndTwo2ArticlesFixture from "../fixtures/opinionandtwo/2-articles";
import opinionAndTwo3ArticlesFixture from "../fixtures/opinionandtwo/3-articles";

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

const opinionAndTwo1ArticleFixtureData = opinionAndTwo1ArticleFixture({
  url: "https://test.io",
  crop23: "https://crop23.io",
  crop169: "https://crop169.io",
  headline: "Test Headline",
  summary125: testSummary(125),
  summary145: testSummary(145),
  summary160: testSummary(160),
  summary225: testSummary(225)
}).data;

const opinionAndTwo2ArticlesFixtureData = opinionAndTwo2ArticlesFixture({
  firstCrop23: "https://crop23-1.io",
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstSummary160: testSummary(160),
  firstSummary225: testSummary(225),
  firstUrl: "https://first.io",
  secondCrop23: "https://crop23-2.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondSummary160: testSummary(160),
  secondSummary225: testSummary(225),
  secondUrl: "https://second.io"
}).data;

const opinionAndTwo3ArticlesFixtureData = opinionAndTwo3ArticlesFixture({
  firstCrop23: "https://crop23-1.io",
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstSummary160: testSummary(160),
  firstSummary225: testSummary(225),
  firstUrl: "https://first.io",
  secondCrop23: "https://crop23-2.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondSummary160: testSummary(160),
  secondSummary225: testSummary(225),
  secondUrl: "https://second.io",
  thirdCrop23: "https://crop23-3.io",
  thirdCrop169: "https://crop169-3.io",
  thirdHeadline: "Third Headline",
  thirdSummary125: testSummary(125),
  thirdSummary145: testSummary(145),
  thirdSummary160: testSummary(160),
  thirdSummary225: testSummary(225),
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
    const article = opinionAndTwo1ArticleFixtureData.relatedArticles[0];

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
        template: "OPINION_AND_TWO"
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
        template: "OPINION_AND_TWO"
      }
    };

    renderComponent(
      <RelatedArticles {...createRelatedArticlesProps(data, events)} />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "1a. should send analytics even when no related articles"
    );
  });

  it("should render one opinion related article", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(
          opinionAndTwo1ArticleFixtureData,
          events
        )}
      />
    );

    expect(output).toMatchSnapshot(
      "2. should render one opinion related article"
    );
  });

  it("should send analytics for a opinion related article", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(
          opinionAndTwo1ArticleFixtureData,
          events
        )}
      />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "2a. should send analytics for a opinion related article"
    );
  });

  it("should render one opinion and one support related article", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(
          opinionAndTwo2ArticlesFixtureData,
          events
        )}
      />
    );

    expect(output).toMatchSnapshot(
      "3. should render one opinion and one support related article"
    );
  });

  it("should send analytics for opinion and support related articles", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(
          opinionAndTwo2ArticlesFixtureData,
          events
        )}
      />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "3a. should send analytics for opinion and support related articles"
    );
  });

  it("should render one opinion and two support related articles", () => {
    const events = jest.fn();

    const output = renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(
          opinionAndTwo3ArticlesFixtureData,
          events
        )}
      />
    );

    expect(output).toMatchSnapshot(
      "3. should render one opinion and two support related articles"
    );
  });

  it("should send analytics for opinion and two support related articles", () => {
    const events = jest.fn();

    renderComponent(
      <RelatedArticles
        {...createRelatedArticlesProps(
          opinionAndTwo3ArticlesFixtureData,
          events
        )}
      />
    );

    expect(events.mock.calls).toMatchSnapshot(
      "3a. should send analytics for opinion and two support related articles"
    );
  });
};
