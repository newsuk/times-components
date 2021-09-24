import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import ArticleComments from "../src/article-comments";

export default ({ enabled, publishedTime = "2021-08-10T16:00:00.000Z" }) =>
  render(
    <ArticleComments
      articleId="dummy-article-id"
      publishedTime={publishedTime}
      commentsEnabled={enabled}
      isEnabled={enabled}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{
        account: {
          current: "CurrentSpotID",
          readOnly: "ReadOnlySpotID"
        },
        switchOver: "2020-08-10T16:00:00.000Z"
      }}
      url="dummy-article-url"
    />
  );
