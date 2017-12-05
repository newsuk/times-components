import React from "react";
import { View } from "react-native";
import { storiesOf } from "../../storybook/storiesOfOverloader";
import ArticleSummary from "./article-summary";
import reviewFixture from "./fixtures/review.json";
import emptyParagraphFixture from "./fixtures/article-empty-paragraph.json";

[reviewFixture, emptyParagraphFixture].forEach(fixture => {
  // eslint-disable-next-line no-param-reassign
  fixture.date = new Date(fixture.date);
});

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleSummary", module)
  .add("Paragraph Summary", () =>
    story(<ArticleSummary {...emptyParagraphFixture} />)
  )
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
