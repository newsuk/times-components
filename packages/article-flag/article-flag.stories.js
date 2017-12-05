import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
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
