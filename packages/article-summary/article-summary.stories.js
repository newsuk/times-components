import React from "react";
import { View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import ArticleSummary from "./article-summary";

import defaultFixture from "./fixtures/default.json";
import articleMultiFixture from "./fixtures/article-multi.json";
import noBylineFixture from "./fixtures/no-byline.json";
import noLabelFixture from "./fixtures/no-label.json";
import reviewFixture from "./fixtures/review.json";

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleSummary", module)
  .add("Default", () => story(<ArticleSummary {...defaultFixture} />))
  .add("Summary with multiple paragraphs", () =>
    story(<ArticleSummary {...articleMultiFixture} />)
  )
  .add("No byline", () => story(<ArticleSummary {...noBylineFixture} />))
  .add("No label", () => story(<ArticleSummary {...noLabelFixture} />))
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
