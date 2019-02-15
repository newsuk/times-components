import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture from "../fixtures/full-article";
import articleSkeletonProps from "./shared-article-skeleton-props";

export default () => {
  beforeEach(() => {
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  it("1. analytics when rendering an Article page", () => {
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
};
