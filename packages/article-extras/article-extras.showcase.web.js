/* eslint-disable react/prop-types */

import React from "react";
import styled from "styled-components";
import { AlgoliaSearchProvider } from "@times-components/utils";

import ArticleExtras from "./src/article-extras";
import { relatedArticleSlice, topics } from "./fixtures/article-extras";

const algoliaSearchKeys = {
  applicationId: process.env.STORYBOOK_ALGOLIA_ID || "",
  apiKey: process.env.STORYBOOK_ALGOLIA_KEY || "",
  indexName: process.env.STORYBOOK_ALGOLIA_INDEX || ""
};

const Container = styled.div`
  &.slice {
    #related-articles > div:first-child {
      display: none !important;
    }
    .RelatedArticleSlice {
      display: block !important;
    }
  }
`;
export default {
  children: [
    {
      component: ({ boolean }) => {
        const slice = boolean("Related Article Slice", false, "User State");
        return (
          <Container className={slice ? "slice" : undefined}>
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
          </Container>
        );
      },
      name: "Article Extras",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
