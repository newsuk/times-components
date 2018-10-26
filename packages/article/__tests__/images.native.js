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
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";
import "./mocks.native";

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "onViewableItemsChanged",
  "selectable",
  "style",
  "testID",
  "viewabilityConfig",
  "viewabilityConfigCallbackPairs"
]);

const emptyArticle = {
  byline: null,
  flags: null,
  label: null,
  leadAsset: null,
  relatedArticleSlice: null,
  standfirst: null,
  topics: null
};

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

  const tests = [
    {
      name: "a secondary image",
      test() {
        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  attributes: {
                    caption: "A Caption",
                    credits: "Some Credits",
                    display: "secondary",
                    ratio: "3:2",
                    url: "https://image-2.io"
                  },
                  children: [],
                  name: "image"
                }
              ]
            })}
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

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an inline image",
      test() {
        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
              ...testFixture,
              ...emptyArticle,
              content: [
                {
                  attributes: {
                    caption: "A Caption",
                    credits: "Some Credits",
                    display: "inline",
                    ratio: "9:4",
                    url: "https://image-inline.io"
                  },
                  children: [],
                  name: "image"
                }
              ]
            })}
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

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
