import "../mocks.web";
import React from "react";
import renderer from "react-test-renderer";
import ArticleSkeleton from "../../src/article-skeleton";
import articleFixture from "../../fixtures/full-article";
import articleSkeletonProps from "../shared-article-skeleton-props";
import shared from "../shared-tracking";

beforeEach(() => {
  global.nuk = { user: { registrationType: "logged out" } };
});

afterEach(() => {
  global.nuk = {};
});

it("analytics when rendering a shared Article page with metered access", () => {
  const userStateMock = {
    isLoggedIn: true,
    isMetered: true,
    isShared: true,
    isMeteredExpired: false,
    registrationType: "metered access:article limit not reached"
  };

  global.nuk.user = userStateMock;
  const stream = jest.fn();

  renderer.create(
    <ArticleSkeleton
      {...articleSkeletonProps}
      analyticsStream={stream}
      data={articleFixture()}
      Header={() => null}
      onAuthorPress={() => {}}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      onLinkPress={() => {}}
      onRelatedArticlePress={() => {}}
      onTwitterLinkPress={() => {}}
      onVideoPress={() => {}}
    />
  );
  expect(stream.mock.calls).toMatchSnapshot();
});

shared();
