import React from "react";
import { StyleSheet, Text } from "react-native";
import renderer from "react-test-renderer";
import ArticleByline from "@times-components/article-byline";
import defaultFixture from "../fixtures/default.json";
import articleMultiFixture from "../fixtures/article-multi.json";
import emptyParagraphFixture from "../fixtures/article-empty-paragraph.json";
import noBylineFixture from "../fixtures/no-byline.json";
import noLabelFixture from "../fixtures/no-label.json";
import reviewFixture from "../fixtures/review.json";
import blankFixture from "../fixtures/blank.json";

export default ArticleSummary => {
  const styles = StyleSheet.create({
    metaText: {
      color: "#696969",
      fontSize: 13,
      lineHeight: 15,
      fontFamily: "GillSansMTStd-Medium",
      marginBottom: 5
    }
  });
  const createByline = byline =>
    byline ? (
      <Text style={styles.metaText}>
        <ArticleByline ast={defaultFixture.byline} />
      </Text>
    ) : null;
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("renders an article-summary component with a single paragraph", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...defaultFixture}
          byline={() => createByline(defaultFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with multiple paragraphs", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...articleMultiFixture}
          byline={() => createByline(articleMultiFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with content including line breaks", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...reviewFixture}
          byline={() => createByline(reviewFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with headline and no content", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...blankFixture}
          byline={() => createByline(blankFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with empty content at the end trimmed", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...emptyParagraphFixture}
          byline={() => createByline(emptyParagraphFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with no byline", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...noBylineFixture}
          byline={() => createByline(noBylineFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with no label", () => {
    const tree = renderer
      .create(
        <ArticleSummary
          {...noLabelFixture}
          byline={() => createByline(noLabelFixture.byline)}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
