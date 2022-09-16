/* eslint-disable react/prop-types */

import React from "react";
import styled from "styled-components";

import ArticleExtras from "./src/article-extras";
import { relatedArticleSlice, topics } from "./fixtures/article-extras";

const commentingConfig = {
  account: "sp_pCQgrRiN"
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
            <ArticleExtras
              analyticsStream={getAnalyticsStream(action)}
              articleId="dummy-article-id"
              commentsEnabled
              registerNode={() => {}}
              relatedArticleSlice={relatedArticleSlice}
              relatedArticlesVisible
              commentingConfig={commentingConfig}
              topics={topics}
              section="Comment"
            />
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
            <ArticleExtras
              analyticsStream={getAnalyticsStream(action)}
              articleId={article.id}
              commentsEnabled
              registerNode={() => {}}
              relatedArticleSlice={relatedArticleSlice}
              relatedArticlesVisible={false}
              commentingConfig={commentingConfig}
              topics={topics}
            />
          </>
        );
      },
      name: "Algolia Rail",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
