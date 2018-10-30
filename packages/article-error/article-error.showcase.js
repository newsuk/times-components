import React from "react";
import ArticleError from "./src/article-error";

export default {
  children: [
    {
      component: () => <ArticleError refetch={() => null} />,
      name: "Default",
      platform: "native",
      type: "story"
    }
  ],
  name: "Primitives/Article Error"
};
