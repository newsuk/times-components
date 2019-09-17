import React from "react";
import { ContextProviderWithDefaults } from "@times-components/context";
import ArticleExtras from "./src/article-extras";
import { relatedArticleSlice, topics } from "./fixtures/article-extras";

export default {
  children: [
    {
      component: () => (
        <ArticleExtras
          analyticsStream={() => {}}
          articleId="dummy-article-id"
          commentsEnabled
          registerNode={() => {}}
          relatedArticleSlice={relatedArticleSlice}
          relatedArticlesVisible
          spotAccountId="dummy-spot-id"
          topics={topics}
        />
      ),
      name: "Article Extras",
      type: "story"
    },
    {
      component: () => (
        <ContextProviderWithDefaults
          value={{
            newskit: true
          }}
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
          />
        </ContextProviderWithDefaults>
      ),
      name: "Article Extras via Newskit",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
