import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleFlag from "./article-flag";

storiesOf("ArticleFlag", module)
  .add("ArticleFlag (New)", () =>
    <ArticleFlag
      style={{ color: "red" }}
      title="New"
      value={true}
    />
  )
  .add("ArticleFlag (Sponsored)", () =>
    <ArticleFlag
      style={{ color: "red" }}
      title="Sponsored"
      value={true}
    />
  )
  .add("ArticleFlag (Updated)", () =>
    <ArticleFlag
      style={{ color: "red" }}
      title="Updated"
      value={true}
    />
  );
