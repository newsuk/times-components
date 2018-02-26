import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "./article-flag";

storiesOf("Primitives/ArticleFlag", module)
  .addDecorator(checkA11y)
  .add("ArticleFlag (New)", () => <NewArticleFlag />)
  .add("ArticleFlag (Updated)", () => <UpdatedArticleFlag />)
  .add("ArticleFlag (Exclusive)", () => <ExclusiveArticleFlag />)
  .add("ArticleFlag (Sponsored)", () => <SponsoredArticleFlag />);
