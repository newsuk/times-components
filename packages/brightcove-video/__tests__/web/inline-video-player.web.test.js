import React from "react";
import renderer from "react-test-renderer";

import { defaultVideoProps } from "../shared";
import InlineVideoPlayer from "../../src/inline-video-player.web";

describe("InlineVideoPlayer", () => {

  afterEach(() => {
    delete window.bc;
    delete window.videojs;
    InlineVideoPlayer.index = 0;
    InlineVideoPlayer.scriptLoadError = false;
    InlineVideoPlayer.activePlayers = [];
    InlineVideoPlayer.brightcoveSDKLoadedStarted = false;
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("appends correct script tag to body", () => {
    renderer.create(
      <InlineVideoPlayer {...defaultVideoProps} />
    );

    expect(document.body.innerHTML.trim()).toBe(
      '<script src="//players.brightcove.net/[account id]/[player id]_default/index.min.js"></script>'
    );
  });

  it("appends correct script tag to body when no playerId supplied", () => {
    renderer.create(
      <InlineVideoPlayer {...defaultVideoProps} playerId={undefined} />
    );

    expect(document.body.innerHTML.trim()).toBe(
      '<script src="//players.brightcove.net/[account id]/default_default/index.min.js"></script>'
    );
  });

  it("only appends one script tag to the body for multiple players", () => {
    const appendScript = jest.spyOn(InlineVideoPlayer, "appendScript");
    renderer.create(
      <InlineVideoPlayer {...defaultVideoProps} />
    );
    renderer.create(
      <InlineVideoPlayer {...defaultVideoProps} />
    );

    expect(appendScript).toHaveBeenCalledTimes(1);
  });

  it.skip("does not attempt to initialise the brightcove player before the script has loaded", () => {
    const initVideoSpy = jest.spyOn(InlineVideoPlayer.prototype, "initVideo");

    renderer.create(
      <View>
        <InlineVideoPlayer
          accountId="[ACCOUNT_ID1]"
          videoId="[VIDEO_ID1]"
          playerId="[PLAYER_ID1]"
        />
        <InlineVideoPlayer
          accountId="[ACCOUNT_ID2]"
          videoId="[VIDEO_ID2]"
          playerId="[PLAYER_ID2]"
        />
      </View>
    );

    expect(initVideoSpy.mock.calls.length).toBe(0);

    initVideoSpy.mockRestore();
  });

  it.skip("uses the initialise function once the script has loaded", () => {
    const readyMock = jest.fn();
    const onMock = jest.fn();
    const initVideoSpy = jest.spyOn(InlineVideoPlayer.prototype, "initVideo");

    window.bc = jest.fn();
    window.videojs = jest.fn().mockReturnValue({
      ready: readyMock,
      on: onMock
    });

    renderer.create(
      <View>
        <InlineVideoPlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          playerId="[PLAYER_ID1]"
        />
        <InlineVideoPlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          playerId="[PLAYER_ID2]"
        />
      </View>
    );

    expect(initVideoSpy.mock.calls).toHaveLength(2);
    expect(window.bc.mock.calls).toHaveLength(2);
    expect(window.videojs.mock.calls).toHaveLength(2);

    initVideoSpy.mockRestore();
  });

  it.skip("disposes the videojs object on unmount", () => {
    // TODO
  });

});
