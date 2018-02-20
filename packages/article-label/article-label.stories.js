import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { select } from "@storybook/addon-knobs/react";
import invert from "lodash.invert";
import sectionColours from "@times-components/styleguide";
import ArticleLabel from "./article-label";

storiesOf("Primitives/ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel
    title="swimming"
    color={select("Section", invert(sectionColours), "#333333")}
  />
));
