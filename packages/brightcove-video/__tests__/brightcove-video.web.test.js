import { View } from "react-native";
import React from "react";
import BrightcoveVideo from "../brightcove-video.web";
import renderer from "react-test-renderer";

describe("brightcove-video web component", () => {
  let appendChildMock, dummyElem;

  beforeEach(() => {
    appendChildMock = jest.fn();
    dummyElem = {};

    global.document = {
      createElement: () => dummyElem,
      getElementById: () => dummyElem,
      body: {
        appendChild: appendChildMock
      }
    };
  });

  afterEach(() => {
    window.bc = undefined;
    window.videojs = undefined;
    BrightcoveVideo.hasLoadedScript = false;
    delete global.document;
  });

  it("renders correctly", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree).toBeTruthy();
    expect(tree.type).toBe("video");
    expect(tree.children).toBe(null);
  });

  it("appends script tag to body", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(appendChildMock.mock.calls.length).toBe(1);
    expect(appendChildMock.mock.calls[0][0]).toBe(dummyElem);
  });

  it("width x height default to 320 x 180", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree.props.width).toBe(320);
    expect(tree.props.height).toBe(180);
  });

  it("width x height can be overridden", () => {
    const tree = renderer
      .create(<BrightcoveVideo height={400} width={600} />)
      .toJSON();

    expect(tree.props.width).toBe(600);
    expect(tree.props.height).toBe(400);
  });

  it("generates the correct script link", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" />)
      .toJSON();

    expect(dummyElem.src).toBe(
      "//players.brightcove.net/[ACCOUNT_ID]/default_default/index.min.js"
    );
  });

  it("passes accountId & videoId to video correctly", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree.props["data-video-id"]).toBe("[VIDEO_ID]");
    expect(tree.props["data-account"]).toBe("[ACCOUNT_ID]");
  });

  it("does not attempt to initialise the brightcove player before the script has loaded", () => {
    const videos = () =>
      renderer.create(
        <View>
          <BrightcoveVideo accountId="[ACCOUNT_ID1]" videoId="[VIDEO_ID1]" />
          <BrightcoveVideo accountId="[ACCOUNT_ID2]" videoId="[VIDEO_ID2]" />
        </View>
      );

    expect(videos).not.toThrow();
  });

  it("uses the initialise function once the script has loaded", () => {
    window.bc = jest.fn();
    window.videojs = jest.fn();

    const videos = renderer.create(
      <View>
        <BrightcoveVideo accountId="[ACCOUNT_ID1]" videoId="[VIDEO_ID1]" />
        <BrightcoveVideo accountId="[ACCOUNT_ID1]" videoId="[VIDEO_ID1]" />
      </View>
    );

    expect(window.bc.mock.calls).toHaveLength(1);
    expect(window.videojs.mock.calls).toHaveLength(1);
  });
});
