import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";

import RelatedArticles from "../related-articles/related-articles";

import singleRelatedArticleFixture from "../related-articles/fixtures/single-related-article.json";
import singleRelatedArticleNoImageFixture from "../related-articles/fixtures/single-related-article-no-image.json";
import singleRelatedArticleNoLabelFixture from "../related-articles/fixtures/single-related-article-no-label.json";
import singleRelatedArticleNoBylineFixture from "../related-articles/fixtures/single-related-article-no-byline.json";
import twoRelatedArticlesFixture from "../related-articles/fixtures/two-related-articles.json";
import threeRelatedArticlesFixture from "../related-articles/fixtures/three-related-articles.json";

const createRelatedArticlesProps = (fixtureData, action = () => {}) => ({
  analyticsStream: action,
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
  onPress: () => {}
});

export default () => {
  const realIntl = Intl;

  beforeEach(() => {
    mockDate.set("1/1/2018");
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    mockDate.reset();
    global.Intl = realIntl;
  });

  describe("Related articles", () => {
    it("handles no related articles", () => {
      const data = {
        relatedArticles: [],
        relatedArticlesLayout: {
          template: "DEFAULT"
        }
      };
      const tree = renderer
        .create(<RelatedArticles {...createRelatedArticlesProps(data)} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(singleRelatedArticleFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article with no lead image", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              singleRelatedArticleNoImageFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article with no label", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              singleRelatedArticleNoLabelFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article with no byline", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              singleRelatedArticleNoBylineFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders two related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(twoRelatedArticlesFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders three related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(threeRelatedArticlesFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("tracker", () => {
    it("sends analytics even if no related articles are rendered", () => {
      const events = jest.fn();
      const data = {
        relatedArticles: [],
        relatedArticlesLayout: {
          template: "DEFAULT"
        }
      };
      renderer.create(
        <RelatedArticles {...createRelatedArticlesProps(data, events)} />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });

    it("sends analytics if a single related article is rendered", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            singleRelatedArticleFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });

    it("sends analytics if a single related article with no byline is rendered", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            singleRelatedArticleNoBylineFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });

    it("sends analytics if two related articles are rendered", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            twoRelatedArticlesFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });

    it("sends analytics if three related articles are rendered", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            threeRelatedArticlesFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });
  });
};
