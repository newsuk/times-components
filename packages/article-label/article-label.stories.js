import "react-native";
import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import ArticleLabel from "./article-label";

storiesOf("ArticleLabel", module).add("ArticleLabel", () => (
  <ArticleLabel title="swimming" color="#008347" />
));
