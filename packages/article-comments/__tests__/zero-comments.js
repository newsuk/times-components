import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleComments from "../src/article-comments";

jest.mock("@times-components/provider", () =>
  // eslint-disable-next-line global-require
  require("./mock-provider-zero-comments")
);

const findViewByText = (testInstance, text) =>
  testInstance.root.find(
    node =>
      typeof node.type === "string" &&
      node.type.includes("Text") &&
      node.children.length === 1 &&
      node.children[0] === text
  );

export default () => {
  test("single comment", () => {
    const testInstance = TestRenderer.create(
      <ArticleComments
        articleId="dummy-article-id"
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        url="dummy-article-url"
      />
    );

    const comments = findViewByText(testInstance, "0 comments");
    const commentButton = findViewByText(testInstance, "Post a comment");
    expect(comments).toBeDefined();
    expect(commentButton).toBeDefined();
  });
};
