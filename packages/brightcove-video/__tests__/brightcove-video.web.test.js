import "react-native";
import React from "react";
import BrightcoveVideo from "../brightcove-video.web";
import renderer from "react-test-renderer";

describe("brightcove-video web component", () => {
  beforeEach(() => {
    global.document = {
      createElement: () => ({}),
      body: {
        appendChild: () => {}
      }
    };
  });

  afterEach(function() {
    delete global.document;
  });

  it("renders correctly", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree).toBeTruthy();
  });
});
