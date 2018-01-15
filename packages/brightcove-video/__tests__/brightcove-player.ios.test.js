import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import BrightcovePlayer from "../brightcove-player.ios";

describe("brightcove-player iOS component", () => {
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
      RNTBrightcoveManager: {
        play: mockNativeFunc
      }
    }));

    const rootInstance = brightcoveVideo.getInstance();

    rootInstance.runNativeCommand("play", []);

    expect(mockNativeFunc.mock.calls.length).toEqual(1);
  });
});
