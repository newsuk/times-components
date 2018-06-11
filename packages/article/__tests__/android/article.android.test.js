import shared from "../shared";
import nativeShared from "../shared-native";
import sharedTracking from "../shared-tracking";

jest.mock("@times-components/article-byline", () =>
  // eslint-disable-next-line global-require
  require("../article-byline-mock")
);
jest.mock("@times-components/article-flag", () => ({
  ExclusiveArticleFlag: "ExclusiveArticleFlag",
  NewArticleFlag: "NewArticleFlag",
  UpdatedArticleFlag: "UpdatedArticleFlag",
  SponsoredArticleFlag: "SponsoredArticleFlag"
}));
jest.mock("@times-components/article-image", () => "ArticleImage");
jest.mock("@times-components/article-label", () => "ArticleLabel");
jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/video-label", () => "VideoLabel");
jest.mock("@times-components/brightcove-video", () => "BrightcoveVideo");
jest.mock("@times-components/pull-quote", () => "PullQuote");
jest.mock("@times-components/related-articles", () => "RelatedArticles");
jest.mock("@times-components/watermark", () => "Watermark");
jest.mock("@times-components/tracking", () => {
  const mockTracking = component => component;
  return {
    withTrackingContext: mockTracking
  };
});

describe("Article tests on android", () => {
  shared();
  nativeShared();
});

jest.unmock("@times-components/tracking");

describe("Article Tracking tests on web", () => {
  sharedTracking();
});
