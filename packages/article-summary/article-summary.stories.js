import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";
import LateralSpacingDecorator from "../../storybook/decorators/lateral-spacing";
import articleFixture from "./fixtures/article.json";
import reviewFixture from "./fixtures/review.json";

[articleFixture, reviewFixture].forEach(fixture => {
  // eslint-disable-next-line no-param-reassign
  fixture.date = new Date(fixture.date);
});

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleSummary", module)
  .addDecorator(LateralSpacingDecorator)
  .add("Paragraph Summary", () =>
    story(<ArticleSummary {...articleFixture} />)
  )
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
