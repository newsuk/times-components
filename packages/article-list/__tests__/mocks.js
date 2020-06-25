// eslint-disable-next-line global-require
jest.mock("@times-components-native/ad", () => ({
  __esModule: "true",
  AdContainer: "AdContainer"
}));
jest.mock("@times-components-native/article-summary", () => ({
  __esModule: "true",
  default: "ArticleSummary",
  ArticleSummaryHeadline: "ArticleSummaryHeadline",
  ArticleSummaryContent: "ArticleSummaryContent"
}));
jest.mock("@times-components-native/button", () => "Button");
jest.mock("@times-components-native/card", () => "Card");
jest.mock("@times-components-native/image", () => "Image");
jest.mock("@times-components-native/link", () => "Link");
jest.mock("@times-components-native/pagination", () => "Pagination");
jest.mock("@times-components-native/tracking", () => {
  const mockTracking = component => component;
  return {
    withTrackEvents: mockTracking,
    withTrackingContext: mockTracking,
    withTrackScrollDepth: mockTracking
  };
});
jest.mock("@times-components-native/watermark", () => "Watermark");
