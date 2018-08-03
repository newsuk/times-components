import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import "./mocks.native";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "style",
  "testID"
]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitKeys.has(key))
    )
  );

  const tests = [
    {
      name: "a full article with enabled comments",
      test() {
        const article = articleFixture(testFixture);

        const testInstance = TestRenderer.create(
          <Article
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={article}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a full article with a single comment",
      test() {
        const article = articleFixture({
          ...testFixture,
          commentCount: 1
        });

        const testInstance = TestRenderer.create(
          <Article
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={article}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a full article with disabled comments",
      test() {
        const article = articleFixture({
          ...testFixture,
          commentsEnabled: false
        });

        const testInstance = TestRenderer.create(
          <Article
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={article}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  iterator(tests);
};
