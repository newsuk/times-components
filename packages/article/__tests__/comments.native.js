import React from "react";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import "./mocks.native";
import shared from "./comments.base";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

const findViewByText = (testInstance, text) =>
  testInstance.root.find(
    node =>
      typeof node.type === "string" &&
      node.type.includes("Text") &&
      node.children.length === 1 &&
      node.children[0] === text
  );

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "selectable",
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

  shared();

  test("single comment", () => {
    const article = articleFixture({
      ...testFixture,
      commentCount: 1
    });

    const testInstance = TestRenderer.create(
      <Article
        {...articleProps}
        adConfig={adConfig}
        analyticsStream={() => {}}
        article={article}
        onAuthorPress={() => {}}
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        onLinkPress={() => {}}
        onRelatedArticlePress={() => {}}
        onTopicPress={() => {}}
        onTwitterLinkPress={() => {}}
        onVideoPress={() => {}}
      />
    );

    const comments = findViewByText(testInstance, "1 comment");
    expect(comments).toBeDefined();
  });
};
