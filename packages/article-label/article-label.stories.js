import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { select } from "@storybook/addon-knobs/react";
import swap from "@times-components/storybook";
import ArticleLabel from "./article-label";

// Waiting on styleguide approval
const options = {
  thedish: "#db133b",
  sport: "#008347",
  comment: "#850029"
};

storiesOf("Primitives/ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel
    title="swimming"
    color={select("Section", swap(options), "#008347")}
  />
));
