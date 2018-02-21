import "react-native";
import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { select } from "@storybook/addon-knobs/react";
import invert from "lodash.invert";
import { Colours } from "@times-components/styleguide";
import ArticleLabel from "./article-label";

storiesOf("Primitives/ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel
    title="swimming"
    color={select("Section", invert(Colours.sectionColours), "#333333")}
  />
));
