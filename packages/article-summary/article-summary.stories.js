import React from "react";
import { View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import ArticleSummary from "./article-summary";
import reviewFixture from "./fixtures/review.json";
import articleMulti from "./fixtures/article-multi.json";
import articleSingle from "./fixtures/article-single.json";

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleSummary", module)
  .add("Paragraph Summary (multiple)", () =>
    story(<ArticleSummary {...articleMulti} />)
  )
  .add("Paragraph Summary (single)", () =>
    story(<ArticleSummary {...articleSingle} />)
  )
  .add("Review/Rating Summary", () =>
    story(<ArticleSummary {...reviewFixture} />)
  );
