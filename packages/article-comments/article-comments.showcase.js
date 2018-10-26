/* eslint-disable react/prop-types */
import React from "react";
import ArticleComments from "./src/article-comments";
import CommentError from "./src/comment-error";

const renderComments = ({ enabled }) => (
  <ArticleComments
    articleId="dummy-article-id"
    commentCount={123}
    commentsEnabled={enabled}
    onCommentGuidelinesPress={() => { }}
    onCommentsPress={() => { }}
    url="dummy-article-url"
  />
)
export default {
  children: [
    {
      component: () => renderComments({ enabled: true }),
      name: "Enabled",
      type: "story"
    },
    {
      component: () => renderComments({ enabled: false }),
      name: "Disabled",
      type: "story"
    },
    {
      component: () => (<CommentError refetch={() => { }} />),
      name: "Error",
      type: "story"
    }
  ],
  name: "Primitives/ArticleComments"
};
