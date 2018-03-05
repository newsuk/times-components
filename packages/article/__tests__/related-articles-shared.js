/* global context */
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

  context("DEFAULT template", () => {
    it("should handle no related articles", () => {
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

    it("should render one related article", () => {
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

    it("should render two related articles", () => {
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

    it("should render three related articles", () => {
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
  });

  context("LEAD AND TWO template", () => {
    it("should render one lead related article", () => {
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

    it("should render one lead and one support related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(leadTwoRelatedArticlesFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("should render one lead and two support related articles", () => {
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

  context("tracking and analytics", () => {
    it("should send analytics even when no related articles", () => {
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

    it("should send analytics for a single related article", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            defaultSingleRelatedArticleFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });

    it("should send analytics for two related articles", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            defaultTwoRelatedArticlesFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });

    it("should send analytics for three related articles", () => {
      const events = jest.fn();
      renderer.create(
        <RelatedArticles
          {...createRelatedArticlesProps(
            defaultThreeRelatedArticlesFixture.data,
            events
          )}
        />
      );
      expect(events.mock.calls).toMatchSnapshot();
    });
  });
};
