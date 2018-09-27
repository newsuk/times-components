import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";
import Article from "../src/article";
import { adConfig } from "./ad-mock";
import articleFixture from "../fixtures/full-article";

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
      <Article
        adConfig={adConfig}
        analyticsStream={stream}
        article={articleFixture()}
        onAuthorPress={() => {}}
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        onLinkPress={() => {}}
        onRelatedArticlePress={() => {}}
        onTopicPress={() => {}}
        onTwitterLinkPress={() => {}}
        onVideoPress={() => {}}
        pageSection="News"
      />
    );
    const [[call]] = stream.mock.calls;

    expect(call).toMatchSnapshot();
  });
};
