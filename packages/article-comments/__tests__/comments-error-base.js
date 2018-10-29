import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleComments from "../src/article-comments";

// eslint-disable-next-line global-require
jest.mock("@times-components/provider", () => require("./mock-provider-error"));

export default () => {
  iterator([
    {
      name: "comments error",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleComments
            articleId="dummy-article-id"
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            url="dummy-article-url"
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
};
