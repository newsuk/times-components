import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import ArticleByline from "@times-components/article-byline";
import ArticleSummary from "./article-summary";
import defaultFixture from "./fixtures/default.json";
import articleMultiFixture from "./fixtures/article-multi.json";
import noBylineFixture from "./fixtures/no-byline.json";
import noLabelFixture from "./fixtures/no-label.json";
import reviewFixture from "./fixtures/review.json";

const styles = StyleSheet.create({
  metaText: {
    color: "#696969",
    fontSize: 13,
    lineHeight: 15,
    fontFamily: "GillSansMTStd-Medium",
    marginBottom: 5
  }
});

const story = m => <View style={{ padding: 20 }}>{m}</View>;
const createByline = byline =>
  byline ? (
    <Text style={styles.metaText}>
      <ArticleByline ast={byline} />
    </Text>
  ) : null;

storiesOf("ArticleSummary", module)
  .add("Default", () =>
    story(
      <ArticleSummary
        {...defaultFixture}
        byline={() => createByline(defaultFixture.byline)}
      />
    )
  )
  .add("Summary with multiple paragraphs", () =>
    story(
      <ArticleSummary
        {...articleMultiFixture}
        byline={() => createByline(articleMultiFixture.byline)}
      />
    )
  )
  .add("No byline", () =>
    story(
      <ArticleSummary
        {...noBylineFixture}
        byline={() => createByline(noBylineFixture.byline)}
      />
    )
  )
  .add("No label", () =>
    story(
      <ArticleSummary
        {...noLabelFixture}
        byline={() => createByline(noLabelFixture.byline)}
      />
    )
  )
  .add("Review/Rating Summary", () =>
    story(
      <ArticleSummary
        {...reviewFixture}
        byline={() => createByline(reviewFixture.byline)}
      />
    )
  );
