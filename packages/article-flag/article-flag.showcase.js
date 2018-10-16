import React from "react";
import ArticleFlag, {
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag
} from "./src/article-flag";

export default {
  children: [
    {
      component: () => <ArticleFlag title="Default" />,
      name: "Article Flag (Default)",
      type: "story"
    },
    {
      component: () => <NewArticleFlag />,
      name: "Article Flag (New)",
      type: "story"
    },
    {
      component: () => <UpdatedArticleFlag />,
      name: "Article Flag (Updated)",
      type: "story"
    },
    {
      component: () => <ExclusiveArticleFlag />,
      name: "Article Flag (Exclusive)",
      type: "story"
    },
    {
      component: () => <SponsoredArticleFlag />,
      name: "Article Flag (Sponsored)",
      type: "story"
    }
  ],
  name: "Primitives/Article Flag"
};
