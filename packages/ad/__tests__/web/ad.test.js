import React from "react";
import renderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";

import Ad, { AdComposer } from "../../src/ad";

// prevent function sources appearing in snapshots
jest.mock(
  "../../src/utils/webview-event-callback-setup",
  () => "mockErrorHandler"
);
jest.mock("../../src/ad-init", () => () => "mockInit");
jest.mock("@times-components/watermark", () => "WaterMark");
jest.mock("WebView", () => "WebView"); // https://github.com/facebook/react-native/issues/12440

addSerializers(
  expect,
  compose(stylePrinter, flattenStyleTransform, rnwTransform())
);

describe("Ad", () => {
  const adProps = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section",
    baseUrl: "https://mock-url.com/"
  };

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders without error", () => {
    jest.spyOn(console, "error").mockImplementationOnce(message => {
      console.error(message); // eslint-disable-line no-console
      throw new Error(message);
    });
    renderer.create(
      <AdComposer>
        <Ad {...adProps} slotName="header" />
      </AdComposer>
    );
    renderer.create(
      <AdComposer>
        <Ad {...adProps} slotName="pixel" />
      </AdComposer>
    );
    renderer.create(
      <AdComposer>
        <Ad {...adProps} slotName="ad-unknown-code" />
      </AdComposer>
    );
  });

  it("renders with one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Ad {...adProps} slotName="header" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders with more than one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <div>
            <Ad {...adProps} slotName="header" />
            <Ad {...adProps} slotName="intervention" />
          </div>
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("displays the ad when setAdReady is called", () => {
    const component = new Ad(adProps);
    jest.spyOn(component, "setState").mockImplementation();
    component.setAdReady();
    expect(component.setState).toHaveBeenCalledWith({ adReady: true });
  });
});
