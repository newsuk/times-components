import React from "react";
import TestRenderer from "react-test-renderer";
import {
  articleComments as makeParams,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import { delay } from "@times-components/test-utils";
import ArticleComments from "../src/article-comments";

const findViewByText = (testInstance, text) =>
  testInstance.root.find(
    node =>
      typeof node.type === "string" &&
      node.type.includes("Text") &&
      node.children.length === 1 &&
      node.children[0] === text
  );

const renderWithMocks = ({ component, onReady, params }) => {
  schemaToMocks(params).then(mocks => {
    const testInstance = TestRenderer.create(
      <MockedProvider mocks={mocks}>{component}</MockedProvider>
    );
    delay(1).then(() => {
      onReady(testInstance);
    });
  });
};

const renderComments = ({ count, enabled, error, onReady }) => {
  renderWithMocks({
    component: (
      <ArticleComments
        articleId="dummy-article-id"
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        url="dummy-article-url"
      />
    ),
    onReady,
    params: makeParams({
      count,
      enabled,
      error,
      variables: () => ({
        id: "dummy-article-id"
      })
    })
  });
};

export default () => {
  it("enabled comments", async done => {
    renderComments({
      enabled: true,
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("disabled comments", async done => {
    renderComments({
      enabled: false,
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("comments error", async done => {
    renderComments({
      error: () => ({ error: "Error" }),
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("zero comments", async done => {
    renderComments({
      count: 0,
      enabled: true,
      onReady: testInstance => {
        expect(findViewByText(testInstance, "0 comments")).toBeDefined();
        expect(findViewByText(testInstance, "Post a comment")).toBeDefined();
        done();
      }
    });
  });

  it("single comment", async done => {
    renderComments({
      count: 1,
      enabled: true,
      onReady: testInstance => {
        expect(findViewByText(testInstance, "1 comment")).toBeDefined();
        expect(findViewByText(testInstance, "View comments")).toBeDefined();
        done();
      }
    });
  });
};
