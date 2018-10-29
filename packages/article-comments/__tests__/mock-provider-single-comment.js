/* eslint-disable react/prop-types, import/prefer-default-export */
import React from "react";

const article = () => ({
  commentCount: 1,
  commentsEnabled: true,
  id: "dummy-article-id"
});

export const ArticleCommentsProvider = ({ children }) => (
  <articleCommentsProvider>
    {children({
      article: article(),
      variables: {}
    })}
  </articleCommentsProvider>
);
