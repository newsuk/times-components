import "react-native";
import React from "react";
import {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "./src/article-flag";

export default {
  name: "Primitives/Article Flag",
  children: [
    {
      type: "story",
      name: "Article Flag (New)",
      component: () => <NewArticleFlag />
    },
    {
      type: "story",
      name: "Article Flag (Updated)",
      component: () => <UpdatedArticleFlag />
    },
    {
      type: "story",
      name: "Article Flag (Exclusive)",
      component: () => <ExclusiveArticleFlag />
    },
    {
      type: "story",
      name: "Article Flag (Sponsored)",
      component: () => <SponsoredArticleFlag />
    }
  ]
};
