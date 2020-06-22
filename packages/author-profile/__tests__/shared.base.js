import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { ApolloError } from "apollo-client";
import "./mocks";
import AuthorProfile from "../src/author-profile";

// eslint-disable-next-line global-require
jest.mock("@times-components/provider", () => require("./mock-provider"));
jest.mock("@times-components/tracking", () => {
  const id = x => x;

  return {
    withTrackEvents: id,
    withTrackingContext: id
  };
});

export default (props, platformTests = []) => {
  const tests = [
    {
      name: "an error page",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} error={new ApolloError("Some Error")} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a loading state",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading page={1} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article list with images",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading={false} page={2} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article list without images",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile
            {...props}
            author={{ ...props.author, hasLeadAssets: false, image: "" }}
            isLoading={false}
            pageSize={12}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "fetches more articles",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading={false} page={2} />
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
          <AuthorProfile
            {...props}
            author={{ ...props.author, hasLeadAssets: false }}
            isLoading={false}
            page={2}
          />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        articleList.props.fetchMore(2);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article list header",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading={false} page={2} />
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
      name: "an article list header with no bio, job title, name or twitter",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile
            {...props}
            author={{
              ...props.author,
              biography: null,
              jobTitle: null,
              name: null,
              twitter: null
            }}
            isLoading={false}
            page={2}
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
          <AuthorProfile {...props} isLoading />
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
    ...platformTests
  ];

  jest.useFakeTimers();

  iterator(tests);
};
