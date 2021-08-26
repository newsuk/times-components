import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import shared from "../shared";
import ArticleComments from "../../src/article-comments";

shared();

it("Render comments label, when comments are loaded", () => {
  // eslint-disable-next-line no-undef
  window.SPOTIM = {
    startSSO: () => {}
  };

  const { asFragment } = render(
    <ArticleComments
      articleId="dummy-article-id"
      commentCount={0}
      commentsEnabled
      isEnabled
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      commentingConfig={{
        account: {
          current: "CurrentSpotID",
          readonly: "ReadOnlySpotID"
        },
        switchOver: "2020-08-10T16:00:00.000Z"
      }}
      url="dummy-article-url"
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
