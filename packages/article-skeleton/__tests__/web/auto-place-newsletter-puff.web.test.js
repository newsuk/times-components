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
import ArticleSkeleton from "../../src/article-skeleton";
import articleSkeletonProps from "../shared-article-skeleton-props";

jest.mock("../../src/article-body/inline-newsletter-puff", () => "NewsletterPuff");

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

const paywallContent = {
  name: "paywall",
  children: [
    {
      children: [
        {
          attributes: { value: "Some paragraph 4" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
    {
      children: [
        {
          attributes: { value: "Some paragraph 5" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    }
  ]
}

const paywallContentWithNewsletter = {
  name: "paywall",
  children: [
    {
      children: [
        {
          attributes: { value: "Some paragraph 4" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
    {
      name: "interactive",
      attributes: {
        element: {
          value: "newsletter-puff",
          attributes: {
            label: "In your inbox",
            code: "TNL-101",
            headline: "Best of Times",
            copy: "We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.",
            imageUri: "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800"
          }
        }
      },
      children: []
    },
    {
      children: [
        {
          attributes: { value: "Some paragraph 5" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    }
  ]
}

const article = articleFixture({
  ...testFixture,
  withAds: false,
  content: [
    {
      children: [
        {
          attributes: { value: "Some paragraph 1" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
    {
      children: [
        {
          attributes: { value: "Some paragraph 2" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
    {
      children: [
        {
          attributes: { value: "Some paragraph 3" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
  ]
});

const renderArticle = (article, flag=false) => (
  <Context.Provider
    value={{
      theme: { scale: scales.medium, sectionColour: "#FF0000" }
    }}
  >
    <ArticleSkeleton
      {...articleSkeletonProps}
      analyticsStream={() => {}}
      data={article}
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
    expect(isNewsletterPuff).toBeTruthy;
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
