import shared from "../shared";
import nativeShared from "../shared-native";
import sharedTracking from "../shared-tracking";

jest.mock("@times-components/article-byline", () => "MockArticleByline");
jest.mock("@times-components/article-flag", () => ({
  ExclusiveArticleFlag: "MockExclusiveArticleFlag",
  NewArticleFlag: "MockNewArticleFlag",
  UpdatedArticleFlag: "MockUpdatedArticleFlag",
  SponsoredArticleFlag: "MockSponsoredArticleFlag"
}));
jest.mock("@times-components/article-label", () => "MockArticleLabel");
jest.mock("@times-components/video-label", () => "MockVideoLabel");
jest.mock("@times-components/brightcove-video", () => "MockBrightcoveVideo");
jest.mock("@times-components/article-image", () => "MockArticleImage");
jest.mock("@times-components/pull-quote", () => "MockPullQuote");
jest.mock("@times-components/related-articles", () => "MockRelatedArticles");
jest.mock("@times-components/topics", () => "MockTopics");
jest.mock("@times-components/watermark", () => "MockWatermark");
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
