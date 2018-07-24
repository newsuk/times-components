import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import snapshotDiff from "snapshot-diff";
import shared from "./shared-with-style.base";
import AuthorProfile from "../src/author-profile";
import author from "./fixtures";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  const props = {
    analyticsStream() {},
    author,
    onArticlePress() {},
    onTwitterLinkPress() {},
    refetch() {},
    slug: "some-slug"
  };

  const tests = [
    {
      name: "an article list header faded in",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading={false} page={2} />
        );

        const articleList = testInstance.root.find(
          node => node.type === "ArticleList"
        );

        const articleListHeaderBefore = TestRenderer.create(
          articleList.props.articleListHeader
        );

        jest.runTimersToTime();

        const articleListHeaderAfter = TestRenderer.create(
          articleList.props.articleListHeader
        );

        expect(
          snapshotDiff(articleListHeaderBefore, articleListHeaderAfter)
        ).toMatchSnapshot();
      }
    }
  ];

  shared(props, tests);
};
