/* eslint-env jest */
import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import BrightcovePlayer from "../brightcove-player.android";

describe("brightcove-player Android component", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("will attempt to call the correct native method", () => {
    const brightcoveVideo = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        videoId="[VIDEO_ID]"
        policyKey="[POLICY_KEY]"
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

    const rootInstance = brightcoveVideo.getInstance();

    rootInstance.runNativeCommand("play", []);

    expect(mockNativeFunc.mock.calls.length).toEqual(1);
    expect(mockNativeFunc.mock.calls[0][1]).toEqual("PLAY_COMMAND");
  });

  it("will go fullscreen if it receives an 'onChange' event with 'isFullscreen' equal to true", () => {
    const brightcoveVideo = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        videoId="[VIDEO_ID]"
        policyKey="[POLICY_KEY]"
      />
    );

    const rootInstance = brightcoveVideo.getInstance();

    rootInstance.onChange({ isFullscreen: true });

    expect(brightcoveVideo.toJSON()).toMatchSnapshot();
  });

  it("will fire event if it receives an 'onChange' event with 'isFullscreen' equal to true", done => {
    const brightcoveVideo = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        videoId="[VIDEO_ID]"
        policyKey="[POLICY_KEY]"
        onEnterFullscreen={done}
      />
    );

    const rootInstance = brightcoveVideo.getInstance();

    rootInstance.onChange({ isFullscreen: true });
  });

  it("will fire event if it receives an 'onChange' event with 'isFullscreen' equal to false", done => {
    const brightcoveVideo = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        videoId="[VIDEO_ID]"
        policyKey="[POLICY_KEY]"
        onExitFullscreen={done}
      />
    );

    const rootInstance = brightcoveVideo.getInstance();

    rootInstance.onChange({ isFullscreen: true });
    rootInstance.onChange({ isFullscreen: false });
  });
});
