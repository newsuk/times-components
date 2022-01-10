import React from "react";
import { addUserStateKnobs } from "@times-components/user-state";

import ArticleComments from "./src/article-comments";

const commentingConfig = {
  account: {
    current: process.env.STORYBOOK_COMMENTING_CURRENT_ID || "sp_pCQgrRiN",
    readOnly: process.env.STORYBOOK_COMMENTING_READONLY_ID || "sp_pCQgrRiN"
  },
  switchOver:
    process.env.STORYBOOK_COMMENTING_SWITCHOVER || "2023-10-10T16:00:00.000Z"
};

export default {
  children: [
    {
      // eslint-disable-next-line react/prop-types
      component: ({ date }) => {
        addUserStateKnobs();
        const switchOver = new Date(
          date(
            "Switch Over Date",
            new Date(commentingConfig.switchOver),
            "User State"
          )
        );
        const config = {
          ...commentingConfig,
          switchOver: switchOver && switchOver.toISOString()
        };

        const publishedTime = new Date(
          date("Article Published Date", new Date(), "User State")
        );

        return (
          <ArticleComments
            key={publishedTime + config.switchOver}
            articleId="dummy-article-id"
            commentsEnabled
            isEnabled
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            url="dummy-article-url"
            commentingConfig={config}
            publishedTime={publishedTime && publishedTime.toISOString()}
          />
        );
      },
      name: "Enabled",
      type: "story"
    },
    {
      component: () => (
        <ArticleComments
          articleId="dummy-article-id"
          commentsEnabled={false}
          isEnabled={false}
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          url="dummy-article-url"
          commentingConfig={commentingConfig}
        />
      ),
      name: "Disabled",
      type: "story"
    }
  ],
  name: "Composed/Article Comments"
};
