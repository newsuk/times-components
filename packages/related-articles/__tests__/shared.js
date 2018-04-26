/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";
import { shallow } from "enzyme";

import RelatedArticles from "../src/related-articles";
import RelatedArticleItem from "../src/related-article-item";

import standard1ArticleFixture from "../fixtures/standard/1-article.json";
import standard2ArticlesFixture from "../fixtures/standard/2-articles.json";
import standard3ArticlesFixture from "../fixtures/standard/3-articles.json";
import leadAndTwo1ArticleFixture from "../fixtures/leadandtwo/1-article.json";
import leadAndTwo2ArticlesFixture from "../fixtures/leadandtwo/2-articles.json";
import leadAndTwo3ArticlesFixture from "../fixtures/leadandtwo/3-articles.json";
import opinionAndTwo1ArticleFixture from "../fixtures/opinionandtwo/1-article.json";
import opinionAndTwo2ArticlesFixture from "../fixtures/opinionandtwo/2-articles.json";
import opinionAndTwo3ArticlesFixture from "../fixtures/opinionandtwo/3-articles.json";

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

export default () => {
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
    const article = standard1ArticleFixture.data.relatedArticles[0];

    const component = shallow(
      <RelatedArticleItem article={article} onPress={onRelatedArticlePress} />
    );

    const eventMock = {};
    component
      .find("Link")
      .at(0)
      .simulate("press", eventMock);

    expect(onRelatedArticlePress).toHaveBeenCalledWith(eventMock, {
      url: article.url
    });
  });

  context("Standard template", () => {
    it("should handle no related articles", () => {
      const events = jest.fn();
      const data = {
        relatedArticles: [],
        relatedArticlesLayout: {
          template: "DEFAULT"
        }
      };
      const tree = renderer
        .create(
          <RelatedArticles {...createRelatedArticlesProps(data, events)} />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "1. Send analytics even when no related articles"
      );
    });

    it("should render one related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              standard1ArticleFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "2a. Standard template: Render a single related article"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "2b. Standard template: Send analytics for a single related article"
      );
    });

    it("should render two related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              standard2ArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "3a. Standard template: Render two related articles"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "3b. Standard template: Send analytics for two related articles"
      );
    });

    it("should render three related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              standard3ArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "4a. Standard template: Render three related articles"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "4b. Standard template: Send analytics for three related articles"
      );
    });
  });

  context("Lead and two template", () => {
    it("should render one lead related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadAndTwo1ArticleFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "5a. Lead and two template: Render one lead related article"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "5b. Lead and two template: Send analytics for a lead related article"
      );
    });

    it("should render one lead and one support related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadAndTwo2ArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "6a. Lead and two template: Render one lead and one support related article"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "6b. Lead and two template: Send analytics for lead and support related articles"
      );
    });

    it("should render one lead and two support related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadAndTwo3ArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "7a. Lead and two template: Render one lead and two support related articles"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "7b. Lead and two template: Send analytics for lead and two support related articles"
      );
    });
  });

  context("Opinion and two template", () => {
    it("should render one opinion related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              opinionAndTwo1ArticleFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "8a. Opinion and two template: Render one opinion related article"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "8b. Opinion and two template: Send analytics for a opinion related article"
      );
    });

    it("should render one opinion and one support related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              opinionAndTwo2ArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "9a. Opinion and two template: Render one opinion and one support related article"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "9b. Opinion and two template: Send analytics for opinion and support related articles"
      );
    });

    it("should render one opinion and two support related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              opinionAndTwo3ArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot(
        "10a. Opinion and two template: Render one opinion and two support related articles"
      );
      expect(events.mock.calls).toMatchSnapshot(
        "10b. Opinion and two template: Send analytics for opinion and two support related articles"
      );
    });
  });
};
