import React from "react";
import TestRenderer from "react-test-renderer";
import { hash, iterator } from "@times-components/test-utils";
import {
  addSerializers,
  compose,
  justChildren,
  minimaliseTransform,
  minimalWebTransform,
  print,
  replacePropTransform,
  replaceTransform
} from "@times-components/jest-serializer";
import Article from "../../src/article";
import articleFixture, { testFixture } from "../../fixtures/full-article";
import { adConfig } from "../ad-mock";

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform,
    replaceTransform({
      div: justChildren
    }),
    replacePropTransform((value, key) => (key === "d" ? hash(value) : value)),
    minimaliseTransform((value, key) => key === "className" || key === "style")
  )
);

const tests = [
  {
    name: "a full article with an image as the lead asset",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            name: "image",
            attributes: {
              display: "primary",
              ratio: "1500:1000",
              url: "https://image.io",
              caption: "An image caption",
              credits: "The image credits"
            },
            children: []
          },
          {
            name: "link",
            attributes: {
              href: "https://link.io",
              target: "_blank"
            },
            children: [
              {
                name: "text",
                attributes: {
                  value: "Some Link"
                },
                children: []
              }
            ]
          },
          {
            name: "paragraph",
            attributes: {},
            children: [
              {
                name: "text",
                attributes: {
                  value: "Some content"
                },
                children: []
              }
            ]
          },
          {
            name: "pullQuote",
            attributes: {
              content: "A pull quote",
              caption: {
                name: "AName",
                twitter: "@AName"
              }
            },
            children: []
          },
          {
            name: "video",
            attributes: {
              display: "primary",
              posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
              brightcoveVideoId: "4084164751001",
              brightcovePolicyKey: "1.2.3.4",
              brightcoveAccountId: "57838016001",
              paidOnly: "false",
              skySports: false,
              caption: "This is video caption",
              posterImageUrl: "https://image.io"
            },
            children: []
          }
        ]
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
