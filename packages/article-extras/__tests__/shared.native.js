import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import "./mocks";
import ArticleExtrasContent from "../src/article-extras-content";
import ArticleExtrasError from "../src/article-extras-error";
import { relatedArticleSlice, topics } from "../fixtures/article-extras";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" ||
          key === "testID" ||
          key === "topics" ||
          key === "slice"
      )
    )
  );

  const tests = [
    {
      name: "article extras content",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleExtrasContent
            analyticsStream={() => {}}
            article={{
              commentCount: 123,
              commentsEnabled: true,
              relatedArticleSlice,
              topics
            }}
            articleId="dummy-article-id"
            articleUrl="dummy-article-url"
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article extras error",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleExtrasError refetch={() => {}} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
