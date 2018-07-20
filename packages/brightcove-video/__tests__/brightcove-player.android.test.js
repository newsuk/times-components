import React from "react";
import TestRenderer from "react-test-renderer";
import BrightcovePlayer from "../src/brightcove-player.android";

describe("brightcove-player Android component", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("will attempt to call the correct native method", () => {
    const testInstance = TestRenderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        policyKey="[POLICY_KEY]"
        videoId="[VIDEO_ID]"
      />
    );

    const mockNativeFunc = jest.fn();

    jest.mock("NativeModules", () => ({
      UIManager: {
        dispatchViewManagerCommand: mockNativeFunc,
        RNTBrightcove: {
          Commands: {
            play: "PLAY_COMMAND"
          }
        }
      }
    }));

    const rootInstance = testInstance.getInstance();

    rootInstance.runNativeCommand("play", []);

    expect(mockNativeFunc.mock.calls.length).toEqual(1);
    expect(mockNativeFunc.mock.calls[0][1]).toEqual("PLAY_COMMAND");
  });

  it("will go fullscreen if it receives an 'onChange' event with 'isFullscreen' equal to true", () => {
    const testInstance = TestRenderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        policyKey="[POLICY_KEY]"
        videoId="[VIDEO_ID]"
      />
    );

    const rootInstance = testInstance.getInstance();

    rootInstance.onChange({ isFullscreen: true });

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("will fire 'onEnterFullscreen' event if it receives an 'onChange' event with 'isFullscreen' equal to true", done => {
    const testInstance = TestRenderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        onEnterFullscreen={done}
        policyKey="[POLICY_KEY]"
        videoId="[VIDEO_ID]"
      />
    );

    const rootInstance = testInstance.getInstance();

    rootInstance.onChange({ isFullscreen: true });
  });

  it("will fire 'onExitFullscreen' event if it receives an 'onChange' event with 'isFullscreen' equal to false", done => {
    const testInstance = TestRenderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        onExitFullscreen={done}
        policyKey="[POLICY_KEY]"
        videoId="[VIDEO_ID]"
      />
    );

    const rootInstance = testInstance.getInstance();

    rootInstance.onChange({ isFullscreen: true });
    rootInstance.onChange({ isFullscreen: false });
  });

  it("will filter android only props from being passed native component", () => {
    const testInstance = TestRenderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        policyKey="[POLICY_KEY]"
        videoId="[VIDEO_ID]"
      />
    );

    const rootInstance = testInstance.getInstance();

    expect(rootInstance.bcv.props.videoId).toEqual("[VIDEO_ID]");
    expect(rootInstance.bcv.props.accountId).toEqual("[ACCOUNT_ID]");
    expect(rootInstance.bcv.props.policyKey).toEqual("[POLICY_KEY]");

    expect(rootInstance.bcv.props.onPlay).toBeDefined();
    expect(rootInstance.bcv.props.onPause).toBeDefined();

    expect(rootInstance.bcv.props.onEnterFullscreen).toBeUndefined();
    expect(rootInstance.bcv.props.onExitFullscreen).toBeUndefined();
  });

  describe("static methods", () => {
    describe("AndroidNative.filterKeys(objToFilter, allowedKeys)", () => {
      it("it will filter out any keys that are not in allowed keys", () => {
        expect(
          BrightcovePlayer.filterKeys({ a: 1, b: 2, c: 3, d: 4, e: 5 }, [
            "a",
            "c",
            "e"
          ])
        ).toEqual({ a: 1, c: 3, e: 5 });
      });
    });
  });
});
