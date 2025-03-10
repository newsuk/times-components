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
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/ts-styleguide";
import MockedProvider from "@times-components/provider-test-tools/src/mocked-provider";
import Article from "../../src/article-in-depth";
import articleFixture, { testFixture } from "../../fixtures/full-article";
import { adConfig } from "../ad-mock";

jest.mock("react-helmet-async", () => ({ Helmet: "Helmet" }));

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
              title: "An image title",
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
              id: "3dbfe6b8-680b-11e9-b277-88f3d445182c",
              is360: false,
              brightcoveAccountId: "57838016001",
              brightcovePolicyKey: "1.2.3.4",
              brightcoveVideoId: "4084164751001",
              brightcovePlayerId: "default",
              caption: "This is video caption",
              display: "primary",
              posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
              posterImageUrl: "https://image.io"
            },
            children: [],
            name: "video"
          }
        ]
      });
      const navigationMode = {
        isCurrentEdition: true,
        isPastSixDays: false,
        isMyArticles: false,
        isStateless: false
      };
      const scale = scales.large;
      const sectionColour = "#FFFFFF";
      const testRenderer = TestRenderer.create(
        <ContextProviderWithDefaults
          value={{
            theme: { scale, sectionColour },
            user: { hasAccess: true, isLoggedIn: true }
          }}
        >
          <MockedProvider>
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
              navigationMode={navigationMode}
              receiveChildList={() => {}}
            />
          </MockedProvider>
        </ContextProviderWithDefaults>
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

  const nuk = {
    user: {
      hasAccess: true,
      isLoggedIn: true
    }
  };
  global.nuk = nuk;
});

afterEach(() => {
  global.Intl = realIntl;
  global.nuk = {};
});

iterator(tests);
