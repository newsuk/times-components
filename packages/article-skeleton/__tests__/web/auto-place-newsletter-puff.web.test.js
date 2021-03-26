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

import { UserState } from "../mocks.web";

import articleFixture, { testFixture } from "../../fixtures/full-article";
import {
  content,
  paywallContent,
  paywallContentWithNewsletter
} from "../../fixtures/newsletter";

import ArticleSkeleton from "../../src/article-skeleton";
import articleSkeletonProps from "../shared-article-skeleton-props";

jest.mock(
  "../../src/article-body/inline-newsletter-puff",
  () => "NewsletterPuff"
);

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

const renderArticle = (data, flag = false) => (
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
      spotAccountId=""
      newsletterPuffFlag={flag}
    />
  </Context.Provider>
);

describe("Article with automatically placed NewsletterPuff", () => {
  it("should not render a NewsletterPuff without feature flag", () => {
    UserState.mockStates = [];
    const output = TestRenderer.create(renderArticle(article));
    const isNewsletterPuffs = output.root.findAllByType("NewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(0);
  });

  it("should not render a NewsletterPuff without the correct section", () => {
    const output = TestRenderer.create(renderArticle(article, true));
    const isNewsletterPuffs = output.root.findAllByType("NewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(0);
  });

  it("should not render a NewsletterPuff without some paywall content", () => {
    article.section = "News";
    const output = TestRenderer.create(renderArticle(article, true));
    const isNewsletterPuffs = output.root.findAllByType("NewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(0);
  });

  it("should render a NewsletterPuff correctly", () => {
    article.section = "News";
    article.content[3] = paywallContent;
    const output = TestRenderer.create(renderArticle(article, true));
    const isNewsletterPuff = output.root.findByType("NewsletterPuff");
    expect(isNewsletterPuff).toBeTruthy();
    expect(output).toMatchSnapshot();
  });

  it("should not render another NewsletterPuff when one already exists", () => {
    article.section = "News";
    article.content[3] = paywallContentWithNewsletter;
    const output = TestRenderer.create(renderArticle(article, true));
    const isNewsletterPuffs = output.root.findAllByType("NewsletterPuff");
    expect(isNewsletterPuffs.length).toBe(1);
  });
});
