import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture from "../fixtures/full-article";
import articleSkeletonProps from "./shared-article-skeleton-props";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

export default () => {
  describe("[Article page analytics]", () => {
    let stream = null;

    beforeEach(() => {
      stream = jest.fn();
      mockDate.set(1514764800000, 0);
    });

    afterEach(() => {
      mockDate.reset();
    });

    it("should match snapshot when rendering an article page", () => {
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
  });
};
