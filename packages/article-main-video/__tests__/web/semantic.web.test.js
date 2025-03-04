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
import { fixtures } from "@times-components/provider-test-tools";
import MockedProvider from "@times-components/provider-test-tools/src/mocked-provider";
import Article from "../../src/article-main-video";
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
    name: "a full article with video as the lead asset",
    test() {
      const scale = scales.large;
      const sectionColour = "#FFFFFF";
      const testInstance = TestRenderer.create(
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
              article={fixtures.articleVideoData}
              onAuthorPress={() => {}}
              onCommentGuidelinesPress={() => {}}
              onCommentsPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
              commentingConfig={{ account: "dummiy-spotim-id" }}
            />
          </MockedProvider>
        </ContextProviderWithDefaults>
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
