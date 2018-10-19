import React from "react";
import ArticleLoading from "./src/article-loading";

export default {
  children: [
    {
      component: () => <ArticleLoading />,
      name: "Default",
      type: "story"
    }
  ],
  name: "Primitives/Article Loading"
};
