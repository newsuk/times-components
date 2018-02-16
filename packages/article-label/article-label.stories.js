import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { select } from "@storybook/addon-knobs/react";
import swap from "@times-components/storybook";
import sectionColours from "@times-components/styleguide";
import ArticleLabel from "./article-label";

storiesOf("Primitives/ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel
    title="swimming"
    color={select("Section", swap(sectionColours), "#008347")}
  />
));
