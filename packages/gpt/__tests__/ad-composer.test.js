import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { JSDOM } from "jsdom";

import AdComposer from "../ad-composer";
import Ad from "../ad";

describe("AdComposer test", () => {
  beforeEach(() => {
    const window = new JSDOM().window;
    global.window = window;
    global.document = window.document;
  });

  it("renders a snapshot with AdComposer and no ads", () => {
    const tree = renderer.create(<AdComposer />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a snapshot with one Ad", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Ad code="ad-header" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a snapshot with more than one Ad", () => {
    const tree = renderer
      .create(
        <AdComposer>
          <Ad code="ad-header" />
          <Ad code="intervention" />
        </AdComposer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
