import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { scales } from "@times-components/styleguide";
import Context from "@times-components/context";
import { MockedProvider } from "@times-components/provider-test-tools";
import { getNewsletter } from "@times-components/provider-queries";

import { UserState } from "../mocks";

import articleFixture, { testFixture } from "../../fixtures/full-article";
import {
  content,
  paywallContent,
  paywallContentWithNewsletter
} from "../../fixtures/newsletter";

import ArticleSkeleton from "../../src/article-skeleton";
import articleSkeletonProps from "../shared-article-skeleton-props";

jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  InlineNewsletterPuff: "InlineNewsletterPuff",
  AutoNewsletterPuff: "AutoNewsletterPuff"
}));

const omitProps = new Set([
  "article",
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => omitProps.has(key))
  )
);

const article = articleFixture({
  ...testFixture,
  withAds: false,
  content
});

const mocks = [
  {
    request: {
      query: getNewsletter,
      variables: {
        code: "TNL-101"
      }
    },
    result: {
      data: {
        newsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: false,
          title: "RED BOX",
          __typename: "Newsletter"
        }
      }
    }
  }
];

const renderArticle = (data, isPreview = false) => (
  <MockedProvider mocks={mocks}>
    <Context.Provider
      value={{
        theme: { scale: scales.medium, sectionColour: "#FF0000" }
      }}
    >
      <ArticleSkeleton
        {...articleSkeletonProps}
        analyticsStream={() => {}}
        data={data}
        onAuthorPress={() => {}}
        onLinkPress={() => {}}
        onRelatedArticlePress={() => {}}
        onTopicPress={() => {}}
        onTwitterLinkPress={() => {}}
        onVideoPress={() => {}}
        commentingConfig={{ account: { current: "dummiy-spotim-id" } }}
        isPreview={isPreview}
        inlineRelatedArticlesFlag
      />
    </Context.Provider>
  </MockedProvider>
);

describe("Article with automatically placed NewsletterPuff", () => {
  beforeEach(() => {
    window.document.cookie = "nuk-consent-personalisation=;max-age=0";
  });

  it("should not render a NewsletterPuff without feature flag", () => {
    UserState.mockStates = [];
    const output = TestRenderer.create(renderArticle(article));
    const isNewsletterPuffs = output.root.findAllByType("AutoNewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(0);
  });

  it("should not render a NewsletterPuff without the correct section", () => {
    const output = TestRenderer.create(renderArticle(article));
    const isNewsletterPuffs = output.root.findAllByType("AutoNewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(0);
  });

  it("should not render a NewsletterPuff without some paywall content", () => {
    article.section = "News";
    const output = TestRenderer.create(renderArticle(article));
    const isNewsletterPuffs = output.root.findAllByType("AutoNewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(0);
  });

  it("should render a NewsletterPuff correctly", async () => {
    article.section = "News";
    article.content[3] = paywallContent;
    window.document.cookie = "nuk-consent-personalisation=1";
    const output = TestRenderer.create(renderArticle(article));
    expect(output).toMatchSnapshot();
    const isNewsletterPuff = output.root.findByType("AutoNewsletterPuff");
    expect(isNewsletterPuff).toBeTruthy();
  });

  it("should not render another NewsletterPuff when one already exists", () => {
    article.section = "News";
    article.content[3] = paywallContentWithNewsletter;
    const output = TestRenderer.create(renderArticle(article));
    expect(output).toMatchSnapshot();
    const isNewsletterPuffs = output.root.findAllByType("InlineNewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(1);
  });
});
