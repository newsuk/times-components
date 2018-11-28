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
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import Article from "../../src/article-main-comment";
import articleFixture, { testFixture } from "../../fixtures/full-article";
import { adConfig } from "../ad-mock";

const omitProps = new Set([
  "className",
  "fill",
  "fillRule",
  "stroke",
  "strokeWidth",
  "style"
]);

addSerializers(
  expect,
  compose(
    print,
    minimalWebTransform,
    replaceTransform({
      div: justChildren
    }),
    replacePropTransform((value, key) => (key === "d" ? hash(value) : value)),
    minimaliseTransform((value, key) => omitProps.has(key))
  )
);

const tests = [
  {
    name: "a full article",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            attributes: {
              caption: "An image caption",
              credits: "The image credits",
              display: "primary",
              ratio: "1500:1000",
              url: "https://image.io"
            },
            children: [],
            name: "image"
          },
          {
            attributes: {
              href: "https://link.io",
              target: "_blank"
            },
            children: [
              {
                attributes: {
                  value: "Some Link"
                },
                children: [],
                name: "text"
              }
            ],
            name: "link"
          },
          {
            attributes: {},
            children: [
              {
                attributes: {
                  value: "Some content"
                },
                children: [],
                name: "text"
              }
            ],
            name: "paragraph"
          },
          {
            attributes: {
              caption: {
                name: "AName",
                text: "a text",
                twitter: "@AName"
              }
            },
            children: [
              {
                attributes: {
                  value: "The pull quote content"
                },
                children: [],
                name: "text"
              }
            ],
            name: "pullQuote"
          },
          {
            attributes: {
              brightcoveAccountId: "57838016001",
              brightcovePolicyKey: "1.2.3.4",
              brightcoveVideoId: "4084164751001",
              caption: "This is video caption",
              display: "primary",
              paidOnly: "false",
              posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
              posterImageUrl: "https://image.io",
              skySports: false
            },
            children: [],
            name: "video"
          }
        ]
      });

      const scale = scales.large;
      const sectionColour = "#FFFFFF";
      const testRenderer = TestRenderer.create(
        <Context.Provider
          value={{
            makeArticleUrl: () => "https://some-url.io",
            theme: { scale, sectionColour }
          }}
        >
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
            receiveChildList={() => {}}
          />
        </Context.Provider>
      );

      expect(testRenderer).toMatchSnapshot();
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
