import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
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
