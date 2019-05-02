import { mockNativeModules } from "@times-components/mocks";
// eslint-disable-next-line global-require
jest.mock("@times-components/ad", () => require("./ad-mock"));
jest.mock("@times-components/article-extras", () => "ArticleExtras");
jest.mock("@times-components/article-byline", () => ({
  ArticleBylineWithLinks: "ArticleBylineWithLinks"
}));
jest.mock("@times-components/article-error", () => "ArticleError");
jest.mock("@times-components/article-flag", () => ({
  ExclusiveArticleFlag: "ExclusiveArticleFlag",
  NewArticleFlag: "NewArticleFlag",
  SponsoredArticleFlag: "SponsoredArticleFlag",
  UpdatedArticleFlag: "UpdatedArticleFlag"
}));
jest.mock("@times-components/article-image", () => "ArticleImage");
jest.mock("@times-components/article-label", () => "ArticleLabel");

jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/brightcove-video", () => "BrightcoveVideo");
jest.mock("@times-components/button", () => "Button");
jest.mock("@times-components/image", () => ({
  ModalImage: "ModalImage"
}));
jest.mock("@times-components/interactive-wrapper", () => "InteractiveWrapper");
jest.mock("@times-components/pull-quote", () => "PullQuote");
jest.mock("@times-components/related-articles", () => "RelatedArticles");
jest.mock("@times-components/watermark", () => "Watermark");
jest.mock("@times-components/video", () => "Video");
jest.mock("@times-components/video-label", () => "VideoLabel");
mockNativeModules();
