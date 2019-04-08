import React from "react";
import ArticleExtras from "./src/article-extras";

export default {
  children: [
    {
      component: () => <ArticleExtras />,
      name: "ArticleExtras",
      type: "story"
    }
  ],
  name: "ArticleExtras"
};
