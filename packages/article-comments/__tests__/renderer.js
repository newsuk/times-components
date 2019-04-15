import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleComments from "../src/article-comments";

// eslint-disable-next-line react/prop-types
export default ({ count, enabled }) =>
  TestRenderer.create(
    <ArticleComments
      articleId="dummy-article-id"
      commentCount={count}
      commentsEnabled={enabled}
      isEnabled={enabled}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      spotAccountId=""
      url="dummy-article-url"
    />
  );
