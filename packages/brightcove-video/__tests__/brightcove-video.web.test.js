import { View } from "react-native";
import React from "react";
import BrightcoveVideo from "../brightcove-video.web";
import renderer from "react-test-renderer";

describe("brightcove-video web component", () => {
  let appendChildMock,
    dummyElem,
    dummyVideoElem,
    dummyWrapperElem,
    getWrapperElemSpy;

  beforeEach(() => {
    appendChildMock = jest.fn();
    dummyElem = { dataset: {} };
    dummyVideoElem = { dataset: {} };
    dummyWrapperElem = {
      appendChild: jest.fn().mockImplementation(() => dummyVideoElem)
    };

    global.document = {
      createElement: () => dummyElem,
      getElementById: () => dummyElem,
      body: {
        appendChild: appendChildMock
      }
    };

    getWrapperElemSpy = jest
      .spyOn(BrightcoveVideo.prototype, "getWrapperElem")
      .mockImplementation(() => dummyWrapperElem);
  });

  afterEach(() => {
    window.bc = undefined;
    window.videojs = undefined;
    BrightcoveVideo.hasLoadedScript = false;
    delete global.document;

    getWrapperElemSpy.mockRestore();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("appends script tag to body", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(appendChildMock.mock.calls.length).toBe(1);
    expect(appendChildMock.mock.calls[0][0]).toBe(dummyElem);
  });

  it.skip("width x height default to 320 x 180", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree.children[0].props.width).toBe(320);
    expect(tree.children[0].props.height).toBe(180);
  });

  it.skip("width x height can be overridden", () => {
    const tree = renderer
      .create(<BrightcoveVideo height={400} width={600} />)
      .toJSON();

    expect(tree.children[0].props.width).toBe(600);
    expect(tree.children[0].props.height).toBe(400);
  });

  it("generates the correct script link", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" />)
      .toJSON();

    expect(dummyElem.src).toBe(
      "//players.brightcove.net/[ACCOUNT_ID]/default_default/index.min.js"
    );
  });

  it.skip("passes accountId & videoId to video correctly", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree.children[0].props["data-video-id"]).toBe("[VIDEO_ID]");
    expect(tree.children[0].props["data-account"]).toBe("[ACCOUNT_ID]");
  });

  it("does not attempt to initialise the brightcove player before the script has loaded", () => {
    const initVideoSpy = jest.spyOn(BrightcoveVideo.prototype, "initVideo");

    const videos = () =>
      renderer.create(
        <View>
          <BrightcoveVideo accountId="[ACCOUNT_ID1]" videoId="[VIDEO_ID1]" />
          <BrightcoveVideo accountId="[ACCOUNT_ID2]" videoId="[VIDEO_ID2]" />
        </View>
      );

    expect(initVideoSpy.mock.calls.length).toBe(0);

    initVideoSpy.mockRestore();
  });

  it("uses the initialise function once the script has loaded", () => {
    const readyMock = jest.fn();
    const onMock = jest.fn();
    const initVideoSpy = jest.spyOn(BrightcoveVideo.prototype, "initVideo");

    window.bc = jest.fn();
    window.videojs = jest.fn().mockReturnValue({
      ready: readyMock,
      on: onMock
    });

    const videos = renderer.create(
      <View>
        <BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />
        <BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />
      </View>
    );

    expect(initVideoSpy.mock.calls.length).toBe(2);
    expect(window.bc.mock.calls).toHaveLength(2);
    expect(window.videojs.mock.calls).toHaveLength(2);

    initVideoSpy.mockRestore();
  });
});
