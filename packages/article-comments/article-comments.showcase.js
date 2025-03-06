import React from "react";
import { addUserStateKnobs } from "@times-components/user-state";

import ArticleComments from "./src/article-comments";

const commentingConfig = {
  account: "sp_pCQgrRiN"
};

export default {
  children: [
    {
      // eslint-disable-next-line react/prop-types
      component: () => {
        addUserStateKnobs();
        return (
          <ArticleComments
            articleId="dummy-article-id"
            commentsEnabled
            isEnabled
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            url="dummy-article-url"
            commentingConfig={commentingConfig}
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
