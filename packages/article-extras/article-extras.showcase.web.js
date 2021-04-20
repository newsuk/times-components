/* eslint-disable react/prop-types */

import React from "react";
import ArticleExtras from "./src/article-extras";
import { relatedArticleSlice, topics } from "./fixtures/article-extras";

export default {
  children: [
    {
      component: ({ boolean }) => (
        <ArticleExtras
          analyticsStream={() => {}}
          articleId="dummy-article-id"
          commentsEnabled
          registerNode={() => {}}
          relatedArticleSlice={relatedArticleSlice}
          relatedArticlesVisible
          spotAccountId="dummy-spot-id"
          topics={topics}
          additionalRelatedArticlesFlag={boolean(
            "Additional Featured Articles",
            false,
            "User State"
          )}
        />
      ),
      name: "Article Extras",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
