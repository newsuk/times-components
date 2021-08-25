import React from "react";
import ArticleComments from "./src/article-comments";

const commentingConfig = {
  account: {
    current: process.env.STORYBOOK_COMMENTING_CURRENT_ID || "CurrentSpotID",
    readonly: process.env.STORYBOOK_COMMENTING_READONLY_ID || "ReadOnlySpotID"
  },
  switchOver: process.env.STORYBOOK_COMMENTING_SWITCHOVER || "20210816"
};

export default {
  children: [
    {
      component: () => (
        <ArticleComments
          articleId="dummy-article-id"
          commentCount={123}
          commentsEnabled
          isEnabled
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          url="dummy-article-url"
          commentingConfig={commentingConfig}
        />
      ),
      name: "Enabled",
      type: "story"
    },
    {
      component: () => (
        <ArticleComments
          articleId="dummy-article-id"
          commentCount={123}
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
