import React from "react";
import ArticleComments from "./src/article-comments";

export default {
  children: [
    {
      component: () => <ArticleComments />,
      name: "ArticleComments",
      type: "story"
    }
  ],
  name: "ArticleComments"
};
