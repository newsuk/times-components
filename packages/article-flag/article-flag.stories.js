import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleFlag from "./article-flag";

storiesOf("ArticleFlag", module)
  .add("ArticleFlag (New)", () => <ArticleFlag title="New" value />)
  .add("ArticleFlag (Sponsored)", () => <ArticleFlag title="Sponsored" value />)
  .add("ArticleFlag (Updated)", () => <ArticleFlag title="Updated" value />)
  .add("ArticleFlag (Custom)", () =>
    <ArticleFlag style={{ color: "green" }} title="Custom" value />
  );
