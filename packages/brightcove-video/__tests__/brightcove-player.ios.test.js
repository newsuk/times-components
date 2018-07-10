import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import BrightcovePlayer from "../src/brightcove-player";

describe("brightcove-player iOS component", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("will attempt to call the correct native method", () => {
    const brightcoveVideo = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        policyKey="[POLICY_KEY]"
        videoId="[VIDEO_ID]"
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
