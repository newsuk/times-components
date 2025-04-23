import React from "react";
import { addUserStateKnobs } from "@times-components/user-state";

import { TrackingContextProvider } from "@times-components/ts-components";
import ArticleComments from "./src/article-comments";
import JoinTheConversationDialog from "./src/join-the-conversation-dialog";

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
    },
    {
      component: () => (
        <TrackingContextProvider
          context={{
            component: "JoinTheConversationDialog",
            attrs: {
              event_navigation_action: "navigation",
              article_parent_name: "commenting"
            }
          }}
        >
          {({ fireAnalyticsEvent }) => (
            <JoinTheConversationDialog
              fireAnalyticsEvent={fireAnalyticsEvent}
            />
          )}
        </TrackingContextProvider>
      ),
      name: "Join the Conversation Dialog",
      type: "story"
    }
  ],
  name: "Composed/Article Comments"
};
