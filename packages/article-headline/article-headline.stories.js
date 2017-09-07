import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleHeadline from "./article-headline";

storiesOf("ArticleHeadline", module).add("ArticleHeadline", () => (
  <ArticleHeadline title="Labour MPs urge Jeremy Corbyn to condemn Maduro’s Venezuela regime" />
));
