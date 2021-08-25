import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleComments from "../src/article-comments";

export default ({ count, enabled }) =>
  TestRenderer.create(
    <ArticleComments
      articleId="dummy-article-id"
      commentCount={count}
      commentsEnabled={enabled}
      isEnabled={enabled}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{ account: { current: "dummiy-spotim-id" } }}
      url="dummy-article-url"
    />
  );
