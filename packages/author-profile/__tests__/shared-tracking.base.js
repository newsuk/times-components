import React from "react";
import TestRenderer from "react-test-renderer";
import { mockNativeModules } from "@times-components/mocks";
import { iterator } from "@times-components/test-utils";
import mockDate from "mockdate";
import "./mocks";
import AuthorProfile from "../src/author-profile";
import authorProfileTrackingContext from "../src/author-profile-tracking-context";
import author from "./fixtures";

mockNativeModules();
// eslint-disable-next-line global-require
jest.mock("@times-components/provider", () => require("./mock-provider"));

export default props => {
  const tests = [
    {
      name: "a twitter link press raises the expected tracking event",
      test() {
        const analyticsStream = jest.fn();
        const onTwitterLinkPress = jest.fn();

        const testInstance = TestRenderer.create(
          <AuthorProfile
            {...props}
            isLoading={false}
            onTwitterLinkPress={onTwitterLinkPress}
          />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        const ArticleListHeader = authorProfileTrackingContext(
          articleList.props.articleListHeader.type
        );

        const articleListHeader = TestRenderer.create(
          <ArticleListHeader
            {...articleList.props.articleListHeader.props}
            analyticsStream={analyticsStream}
            author={author}
            page={5}
            pageSize={10}
          />
        );

        const twitterLink = articleListHeader.root.find(
          node => node.props.testID === "twitterLink"
        );

        twitterLink.props.onPress("event");

        expect(analyticsStream.mock.calls).toMatchSnapshot();
      }
    }
  ];

  jest.useFakeTimers();

  beforeEach(() => {
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  iterator(tests);
};
