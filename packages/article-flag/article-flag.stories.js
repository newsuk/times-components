import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "../../storybook/storiesOfOverloader";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "./article-flag";

storiesOf("ArticleFlag", module)
  .add("ArticleFlag (New)", () => <NewArticleFlag />)
  .add("ArticleFlag (Updated)", () => <UpdatedArticleFlag />)
  .add("ArticleFlag (Exclusive)", () => <ExclusiveArticleFlag />)
  .add("ArticleFlag (Sponsored)", () => <SponsoredArticleFlag />);
