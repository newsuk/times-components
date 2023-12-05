/* eslint-disable import/prefer-default-export */
import { mockUserState } from "@times-components/user-state";

export const UserState = mockUserState();

jest.mock("../src/head", () => "Head");

// eslint-disable-next-line global-require
jest.mock("@times-components/ad", () => ({
  __esModule: true,
  AdContainer: "AdContainer"
}));
jest.mock("@times-components/article-byline", () => ({
  ArticleBylineWithLinks: "ArticleBylineWithLinks",
  hasBylineData: () => true
}));
jest.mock("@times-components/article-extras", () => "ArticleExtras");
jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  ExclusiveArticleFlag: "ExclusiveArticleFlag",
  NewArticleFlag: "NewArticleFlag",
  SponsoredArticleFlag: "SponsoredArticleFlag",
  UpdatedArticleFlag: "UpdatedArticleFlag",
  InlineNewsletterPuff: "InlineNewsletterPuff",
  AutoNewsletterPuff: "AutoNewsletterPuff",
  OptaFootballFixtures: "OptaFootballFixtures",
  OptaFootballStandings: "OptaFootballStandings",
  OptaFootballSummary: "OptaFootballSummary",
  InArticlePuff: "InArticlePuff",
  InfoCard: "InfoCard",
  GalleryCarousel: "GalleryCarousel",
  InfoCardBulletPoints: "InfoCardBulletPoints",
  BigNumbers: "BigNumbers"
}));
jest.mock("@times-components/article-image", () => "ArticleImage");
jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/caption", () => "Caption");
jest.mock("@times-components/date-publication", () => "DatePublication");
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/interactive-wrapper", () => "InteractiveWrapper");
jest.mock("@times-components/key-facts", () => "KeyFacts");
jest.mock("@times-components/link", () => ({
  __esModule: true,
  default: "Link",
  TextLink: "TextLink"
}));
jest.mock("@times-components/pull-quote", () => "PullQuote");
jest.mock("@times-components/related-articles", () => "RelatedArticles");
jest.mock("@times-components/video-label", () => "VideoLabel");
jest.mock("@times-components/sticky", () => {
  const actualSticky = jest.requireActual("@times-components/sticky");
  const { css } = jest.requireActual("styled-components");

  function mockComputeProgressStyles(computer) {
    return css`
      &[MOCK-PROGRESS-SELECTOR] {
        ${computer(0.05)};
      }
    `;
  }

  return {
    __esModule: true,
    ...actualSticky,
    computeProgressStyles: mockComputeProgressStyles,
    PROGRESS_ATTR_NAME: "MOCK-PROGRESS-SELECTOR"
  };
});
