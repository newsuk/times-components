import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import "../mocks.web";
import { adConfig } from "../ad-mock";
import Article from "../../src/article";
import articleFixture, { testFixture } from "../../fixtures/full-article";

jest.mock("@times-components/lazy-load", () => ({ children }) => {
  const observed = new Map([
    [
      "1",
      {
        clientWidth: 600
      }
    ],
    [
      "related-articles",
      {
        clientWidth: 100
      }
    ]
  ]);

  return children({ observed, registerNode: () => {} });
});

const omitProps = new Set([
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => omitProps.has(key))
  )
);

iterator([
  {
    name: "a low quality image if not viewed",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            attributes: {
              caption: "An image caption",
              credits: "The image credits",
              display: "primary",
              ratio: "15:10",
              url: "https://image.io"
            },
            children: [],
            name: "image"
          }
        ]
      });

      const testRenderer = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          data={article}
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

      const {
        props: {
          imageOptions: { highResSize, lowResSize }
        }
      } = testRenderer.root.findByType("ArticleImage");

      expect(highResSize).toEqual(null);
      expect(lowResSize).toEqual(100);
    }
  },
  {
    name: "a high quality image if viewed",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            attributes: {
              caption: "An image caption",
              credits: "The image credits",
              display: "primary",
              ratio: "15:10",
              url: "https://image.io"
            },
            children: [],
            name: "image"
          },
          {
            attributes: {
              caption: "An image caption",
              credits: "The image credits",
              display: "primary",
              ratio: "15:10",
              url: "https://image.io"
            },
            children: [],
            name: "image"
          }
        ]
      });

      const testRenderer = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          data={article}
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

      const [
        ,
        {
          props: {
            imageOptions: { highResSize, lowResSize }
          }
        }
      ] = testRenderer.root.findAllByType("ArticleImage");

      expect(highResSize).toEqual(600);
      expect(lowResSize).toEqual(100);
    }
  },
  {
    name: "visible related articles",
    test() {
      const article = articleFixture({
        ...testFixture
      });

      const testRenderer = TestRenderer.create(
        <Article
          adConfig={adConfig}
          analyticsStream={() => {}}
          data={article}
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

      const { isVisible } = testRenderer.root.findByType(
        "RelatedArticles"
      ).props;

      expect(isVisible).toEqual(true);
    }
  }
]);
