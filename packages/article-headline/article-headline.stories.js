import "react-native";
import React from "react";
import { storiesOf } from "../../storybook/storiesOfOverloader";
import ArticleHeadline from "./article-headline";

storiesOf("ArticleHeadline", module).add("ArticleHeadline", () => (
  <ArticleHeadline text="Labour MPs urge Jeremy Corbyn to condemn Maduro’s Venezuela regime" />
));
