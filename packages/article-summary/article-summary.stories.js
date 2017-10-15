import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";
import props from "./fixtures/article.json";
import LateralSpacingDecorator from "../../storybook/decorators/lateral-spacing";

props.date = new Date(props.date);

storiesOf("ArticleSummary", module)
  .addDecorator(LateralSpacingDecorator)
  .add("ArticleSummary", () => <ArticleSummary {...props} />);
