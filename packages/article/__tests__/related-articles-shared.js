import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";

import RelatedArticles from "../related-articles/related-articles";

import defaultSingleRelatedArticleFixture from "../related-articles/fixtures/default/single-related-article.json";
import defaultTwoRelatedArticlesFixture from "../related-articles/fixtures/default/two-related-articles.json";
import defaultThreeRelatedArticlesFixture from "../related-articles/fixtures/default/three-related-articles.json";
import leadSingleRelatedArticleFixture from "../related-articles/fixtures/lead/single-related-article.json";
import leadTwoRelatedArticlesFixture from "../related-articles/fixtures/lead/two-related-articles.json";
import leadThreeRelatedArticlesFixture from "../related-articles/fixtures/lead/three-related-articles.json";

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

    it("Default template with one related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              defaultSingleRelatedArticleFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Default template with two related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              defaultTwoRelatedArticlesFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Default template with three related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              defaultThreeRelatedArticlesFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Lead and two template with one related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadSingleRelatedArticleFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Lead and two template with two related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(leadTwoRelatedArticlesFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("Lead and two template with three related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadThreeRelatedArticlesFixture.data
            )}
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
