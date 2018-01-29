import React from "react";
import renderer from "react-test-renderer";

import DOMContext from "../dom-context.native";

jest.mock("../dom-context-harness", () => "mockHarness");

describe("DOMContext", () => {
  beforeEach(() => {
    jest.mock("WebView", () => "WebView");
  });

  const makeErrorMessageEvent = (type, detail) => ({
    nativeEvent: {
      data: JSON.stringify({
        type,
        detail
      })
    }
  });

  it("throws an exception when the webview reports an error", () => {
    const component = new DOMContext({ ...DOMContext.defaultProps });
    const f = () =>
      component.handleMessageEvent(makeErrorMessageEvent("err", "message"));
    expect(f).toThrowError(new Error("Error in err inside WebView: message"));
  });

  it("renders correctly", () => {
    const component = renderer.create(
      <DOMContext init={() => {}} data={{ foo: "bar" }} />
    );
    const s = component.toJSON();

    expect(s).toMatchSnapshot();
  });
});
