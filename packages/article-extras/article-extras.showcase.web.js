/* eslint-disable react/prop-types */

import React from "react";
import { AlgoliaSearchProvider } from "@times-components/utils";

import ArticleExtras from "./src/article-extras";
import { relatedArticleSlice, topics } from "./fixtures/article-extras";

const algoliaSearchKeys = {
  applicationId: "",
  apiKey: "",
  indexName: ""
};

export default {
  children: [
    {
      component: ({ boolean }) => (
        <AlgoliaSearchProvider
          algoliaSearchKeys={algoliaSearchKeys}
          article={{ id: "dummy-article-id" }}
        >
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
        </AlgoliaSearchProvider>
      ),
      name: "Article Extras",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
