import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import ArticleSummary from "./article-summary";

import defaultFixture from "./fixtures/default";
import articleMultiFixture from "./fixtures/article-multi";
import noBylineFixture from "./fixtures/no-byline";
import noLabelFixture from "./fixtures/no-label";
import reviewFixture from "./fixtures/review";

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("Composed/ArticleSummary", module)
  .addDecorator(checkA11y)
  .add("Default", () => story(<ArticleSummary {...defaultFixture} />))
  .add("No byline", () => story(<ArticleSummary {...noBylineFixture} />))
  .add("Summary with multiple paragraphs", () =>
    story(<ArticleSummary {...articleMultiFixture} />)
  )
  .add("No label", () => story(<ArticleSummary {...noLabelFixture} />))
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
