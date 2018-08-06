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

    const comments = testInstance.root.find(node => {
      if (
        typeof node.type === "string" &&
        node.type.includes("Text") &&
        node.children.length > 0 &&
        node.children[0] === "1 comment"
      ) {
        return true;
      }
      return false;
    });

    expect(comments).toBeDefined();
  });
};
