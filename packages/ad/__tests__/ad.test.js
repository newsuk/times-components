import React from "react";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import Ad, { AdComposer } from "../ad";

Enzyme.configure({ adapter: new React16Adapter() });

// prevent function sources appearing in snapshots
jest.mock("../dom-context-harness", () => "mockHarness");
jest.mock("../webview-event-callback-setup", () => "mockErrorHandler");
jest.mock("../ad-init", () => () => "mockInit");

jest.mock("../placeholder", () => "Placeholder"); // prevent SVG in snapshots
jest.mock("WebView", () => "WebView"); // https://github.com/facebook/react-native/issues/12440

describe("Ad", () => {
  const adProps = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section",
    code: "mock-code",
    baseUrl: "https://mock-url.com/",
    pos: "mock-pos"
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
        <Ad {...adProps} code="ad-header" />
      </AdComposer>
    );
    renderer.create(
      <AdComposer>
        <Ad {...adProps} code="ad-pixel" />
      </AdComposer>
    );
    renderer.create(
      <AdComposer>
        <Ad {...adProps} code="ad-unknown-code" />
      </AdComposer>
    );
  });

  it("renders with one ad slot", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Ad {...adProps} code="ad-header" />
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
            <Ad {...adProps} code="ad-header" />
            <Ad {...adProps} code="intervention" />
          </div>
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
