import React from "react";
import ArticleLoading from "./src/article-loading";

export default {
  name: "Primitives/Article Loading",
  children: [
    {
      type: "story",
      name: "Default",
      component: () => <ArticleLoading />
    }
  ]
};
