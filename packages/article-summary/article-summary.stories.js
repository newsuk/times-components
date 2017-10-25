import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";
import articleFixture from "./fixtures/article.json";
import reviewFixture from "./fixtures/review.json";
import emptyParagraphFixture from "./fixtures/article-empty-paragraph.json";

[articleFixture, reviewFixture, emptyParagraphFixture].forEach(fixture => {
  // eslint-disable-next-line no-param-reassign
  fixture.date = new Date(fixture.date);
});

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleSummary", module)
  .add("Paragraph Summary", () => story(<ArticleSummary {...articleFixture} />))
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
