import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleHeadline from "./article-headline";

storiesOf("ArticleHeadline", module)
  .add("ArticleHeadline", () =>
    <ArticleHeadline title="Labour MPs urge Jeremy Corbyn to condemn Maduro’s Venezuela regime" />
  )
  .add("ArticleHeadline (without default style)", () =>
    <ArticleHeadline
      title="Labour MPs urge Jeremy Corbyn to condemn Maduro’s Venezuela regime"
      style={{ fontSize: 15, color: "#333333" }}
    />
  );
