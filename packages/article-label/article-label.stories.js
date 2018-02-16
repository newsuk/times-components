import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleLabel from "./article-label";

storiesOf("Primitives/ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel title="swimming" color="#008347" />
));
