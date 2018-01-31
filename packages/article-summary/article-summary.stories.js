import React from "react";
import { View } from "react-native";
import ArticleLabel from "@times-components/article-label";
import { storiesOf } from "dextrose/storiesOfOverloader";
import ArticleSummary from "./article-summary";

import defaultFixture from "./fixtures/default.js";
import articleMultiFixture from "./fixtures/article-multi.js";
import noBylineFixture from "./fixtures/no-byline.js";
import noLabelFixture from "./fixtures/no-label.js";
import reviewFixture from "./fixtures/review.js";

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleSummary", module)
  .add("Default", () => story(<ArticleSummary {...defaultFixture} />))
  .add("No byline", () => story(<ArticleSummary {...noBylineFixture} />))
  .add("Summary with multiple paragraphs", () =>
    story(<ArticleSummary {...articleMultiFixture} />)
  )
  .add("No label", () => story(<ArticleSummary {...noLabelFixture} />))
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
