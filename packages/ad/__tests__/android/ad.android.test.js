import shared from "../ad.native";

jest.mock(
  "../../src/utils/webview-event-callback-setup",
  () => "mockErrorHandler"
);
jest.mock("../../src/ad-init", () => () => "mockAdInit");
jest.mock("WebView", () => "WebView");

describe("android", () => {
  shared();
});
