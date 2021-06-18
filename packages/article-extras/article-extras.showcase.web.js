/* eslint-disable react/prop-types */

import React from "react";
import styled from "styled-components";
import { AlgoliaSearchProvider } from "@times-components/ts-components";

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

const getAnalyticsStream = action => event => {
  // eslint-disable-next-line no-console
  console.log("analytics-action", event);
  action("analytics-action")(event);
};
export default {
  children: [
    {
      component: ({ boolean }, { action }) => {
        const slice = boolean("Related Article Slice", false, "User State");
        return (
          <Container className={slice ? "slice" : undefined}>
            <AlgoliaSearchProvider
              algoliaSearchKeys={algoliaSearchKeys}
              article={{ id: "dummy-article-id" }}
              analyticsStream={getAnalyticsStream(action)}
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
    },
    {
      component: ({ text }, { action }) => {
        const article = {
          bylines: [
            {
              byline: [
                {
                  attributes: {},
                  children: [
                    {
                      attributes: {
                        value: text("ByLline", "Alyson Rudd", "User State")
                      },
                      children: [],
                      name: "text"
                    }
                  ],
                  name: "inline"
                }
              ]
            }
          ],
          headline: text(
            "Headline",
            "If this was goodbye, Harry Kane went with a whimper",
            "User State"
          ),
          label: text("Label", "Premier League", "User State"),
          section: text("Section", "sport", "User State"),
          topics: text("Topics (csv)", "Premier League,Football", "User State")
            .split(",")
            .map(topic => ({ name: topic.trim() }))
        };
        return (
          <>
            <AlgoliaSearchProvider
              algoliaSearchKeys={algoliaSearchKeys}
              article={article}
              analyticsStream={getAnalyticsStream(action)}
            >
              <ArticleExtras
                analyticsStream={getAnalyticsStream(action)}
                articleId={article.id}
                commentsEnabled
                registerNode={() => {}}
                relatedArticleSlice={relatedArticleSlice}
                relatedArticlesVisible={false}
                spotAccountId="dummy-spot-id"
                topics={topics}
                additionalRelatedArticlesFlag
              />
            </AlgoliaSearchProvider>
          </>
        );
      },
      name: "Algolia Rail",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
