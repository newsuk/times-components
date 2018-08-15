import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { ApolloError } from "apollo-client";
import "./mocks";
import Topic from "../src/topic";

// eslint-disable-next-line global-require
jest.mock("@times-components/provider", () => require("./mock-provider"));
jest.mock("@times-components/tracking", () => {
  const id = x => x;

  return {
    withTrackEvents: id,
    withTrackingContext: id
  };
});

export default props => {
  const tests = [
    {
      name: "an error page",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} error={new ApolloError("Some Error")} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a loading state",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} isLoading page={1} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article list",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} isLoading={false} page={2} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "fetches more articles",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} isLoading={false} page={2} />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        articleList.props.fetchMore(2);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "fetches more articles and falls back to previous data if no more",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} isLoading={false} page={2} />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        articleList.props.fetchMore(3);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article list header",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} isLoading={false} page={2} />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        const articleListHeader = TestRenderer.create(
          articleList.props.articleListHeader
        );

        expect(articleListHeader).toMatchSnapshot();
      }
    },
    {
      name: "a topic header with no description",
      test() {
        const testInstance = TestRenderer.create(
          <Topic
            {...props}
            isLoading={false}
            page={2}
            topic={{
              name: "No Desc"
            }}
          />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        const articleListHeader = TestRenderer.create(
          articleList.props.articleListHeader
        );

        expect(articleListHeader).toMatchSnapshot();
      }
    },
    {
      name: "an article list header loading",
      test() {
        const testInstance = TestRenderer.create(
          <Topic {...props} isLoading />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        const articleListHeader = TestRenderer.create(
          articleList.props.articleListHeader
        );

        expect(articleListHeader).toMatchSnapshot();
      }
    }
  ];

  jest.useFakeTimers();

  iterator(tests);
};
