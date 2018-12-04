import React from "react";
import ArticleLeadAsset from "./src/article-lead-asset";

export default {
  children: [
    {
      component: () => <ArticleLeadAsset />,
      name: "ArticleLeadAsset",
      type: "story"
    }
  ],
  name: "ArticleLeadAsset"
};
