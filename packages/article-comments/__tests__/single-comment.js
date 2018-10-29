import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleComments from "../src/article-comments";

jest.mock("@times-components/provider", () =>
  // eslint-disable-next-line global-require
  require("./mock-provider-single-comment")
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

    const comments = findViewByText(testInstance, "1 comment");
    const commentButton = findViewByText(testInstance, "View comments");
    expect(comments).toBeDefined();
    expect(commentButton).toBeDefined();
  });
};
