import React from "react";
import TestRenderer from "react-test-renderer";
import shared from "../shared";
import ArticleComments from "../../src/article-comments";

shared();

it("Render comments label, when comments are loaded", () => {
  // eslint-disable-next-line no-undef
  window.SPOTIM = {
    startSSO: () => {}
  };

  const comments = TestRenderer.create(
    <ArticleComments
      articleId="dummy-article-id"
      commentCount={0}
      commentsEnabled
      isEnabled
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      spotAccountId="test-id"
      url="dummy-article-url"
    />,
    {
      createNodeMock: element => {
        if (element.type === "div") {
          return {
            appendChild: () => {}
          };
        }
        return null;
      }
    }
  );

  expect(comments).toMatchSnapshot();
});
