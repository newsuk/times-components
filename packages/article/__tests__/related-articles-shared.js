/* global context */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";

import RelatedArticles from "../related-articles/related-articles";

import standardSingleRelatedArticleFixture from "../related-articles/fixtures/standard/single-related-article.json";
import standardTwoRelatedArticlesFixture from "../related-articles/fixtures/standard/two-related-articles.json";
import standardThreeRelatedArticlesFixture from "../related-articles/fixtures/standard/three-related-articles.json";
import leadAndTwoLeadOnlyRelatedArticleFixture from "../related-articles/fixtures/leadandtwo/lead-related-article.json";
import leadAndTwoLeadAndSupportRelatedArticlesFixture from "../related-articles/fixtures/leadandtwo/lead-and-support-related-articles.json";
import leadAndTwoLeadAndTwoSupportsRelatedArticlesFixture from "../related-articles/fixtures/leadandtwo/lead-and-two-supports-related-articles.json";

const createRelatedArticlesProps = (fixtureData, action = () => {}) => ({
  analyticsStream: action,
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
  mainId:
    fixtureData.relatedArticlesLayout.lead ||
    fixtureData.relatedArticlesLayout.opinion ||
    "",
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
    jest.useFakeTimers();
  });

  afterEach(() => {
    mockDate.reset();
    global.Intl = realIntl;
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
        "should send analytics even when no related articles"
      );
    });

    it("should render one related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              standardSingleRelatedArticleFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "should send analytics for a single related article"
      );
    });

    it("should render two related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              standardTwoRelatedArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "should send analytics for two related articles"
      );
    });

    it("should render three related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              standardThreeRelatedArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "should send analytics for three related articles"
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
              leadAndTwoLeadOnlyRelatedArticleFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "should send analytics for a lead related article"
      );
    });

    it("should render one lead and one support related article", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadAndTwoLeadAndSupportRelatedArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "should send analytics for lead and support related articles"
      );
    });

    it("should render one lead and two support related articles", () => {
      const events = jest.fn();
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              leadAndTwoLeadAndTwoSupportsRelatedArticlesFixture.data,
              events
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
      expect(events.mock.calls).toMatchSnapshot(
        "should send analytics for lead and two support related articles"
      );
    });
  });
};
