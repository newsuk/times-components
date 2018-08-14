// eslint-disable-next-line global-require
jest.mock("@times-components/ad", () => require("./ad-mock"));
jest.mock("@times-components/button", () => "Button");
jest.mock("@times-components/card", () => "Card");
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/pagination", () => "Pagination");
jest.mock("@times-components/tracking", () => {
  const mockTracking = component => component;
  return {
    withTrackingContext: mockTracking,
    withTrackEvents: mockTracking,
    withTrackScrollDepth: mockTracking
  };
});
jest.mock("@times-components/watermark", () => "Watermark");
