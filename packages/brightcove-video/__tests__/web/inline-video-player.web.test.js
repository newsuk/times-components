import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

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

  const addBrightcoveSDKGlobals = () => {
    window.bc = jest.fn();
    window.videojs = jest.fn().mockImplementation(() => ({
      ready: jest.fn().mockImplementation(f => f()),
      on: jest.fn(),
      dispose: jest.fn(),
      pause: jest.fn(),
      contextmenu: jest.fn()
    }));
  };

  it("appends correct script tag to body", () => {
    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);

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
    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);
    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);

    expect(appendScript).toHaveBeenCalledTimes(1);
  });

  it("does not attempt to initialise the brightcove player before the script has loaded", () => {
    const initVideoSpy = jest.spyOn(InlineVideoPlayer.prototype, "initVideojs");

    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);

    expect(initVideoSpy).not.toHaveBeenCalled();
  });

  it("uses the initialise function once the script has loaded", () => {
    const initVideoSpy = jest.spyOn(InlineVideoPlayer.prototype, "initVideojs");

    addBrightcoveSDKGlobals();

    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);

    expect(initVideoSpy).toHaveBeenCalledTimes(1);
    expect(window.bc).toHaveBeenCalledTimes(1);
    expect(window.videojs).toHaveBeenCalledTimes(1);
  });

  it("disposes the videojs object on unmount", () => {
    addBrightcoveSDKGlobals();

    const component = shallow(<InlineVideoPlayer {...defaultVideoProps} />);
    const instance = component.instance();
    const { dispose } = instance.player;
    component.unmount();
    expect(dispose).toHaveBeenCalled();
  });

  it("renders correctly if the script fails to load", () => {
    InlineVideoPlayer.scriptLoadError = true;
    const tree = renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);
    expect(tree).toMatchSnapshot();
  });

  it("pauses other playing videos if play is called", () => {
    addBrightcoveSDKGlobals();

    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);
    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);

    const [component1, component2] = InlineVideoPlayer.activePlayers;
    jest.spyOn(component1.player, "pause");
    jest.spyOn(component2.player, "pause");

    component1.handlePlay();
    expect(component1.player.pause).not.toHaveBeenCalled();
    component2.handlePlay();
    expect(component1.player.pause).toHaveBeenCalled();
  });

  it("doesn't hold references to players after they have been unmounted", () => {
    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);
    const p2 = renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);

    expect(InlineVideoPlayer.activePlayers.length).toBe(2);
    const [component1] = InlineVideoPlayer.activePlayers;
    p2.unmount();
    expect(InlineVideoPlayer.activePlayers.length).toBe(1);
    expect(InlineVideoPlayer.activePlayers[0]).toBe(component1);
  });

  const fireScriptEventAndExpectComponentMethodToBeCalled = (
    eventName,
    methodName
  ) => {
    const mockScript = {};
    jest
      .spyOn(InlineVideoPlayer.prototype, "createBrightcoveScript")
      .mockReturnValue(mockScript);
    jest.spyOn(InlineVideoPlayer, "appendScript").mockImplementation();

    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);
    renderer.create(<InlineVideoPlayer {...defaultVideoProps} />);
    const [component1, component2] = InlineVideoPlayer.activePlayers;

    jest.spyOn(component1, methodName).mockImplementation();
    jest.spyOn(component2, methodName).mockImplementation();
    mockScript[eventName]();
    expect(component1[methodName]).toHaveBeenCalled();
    expect(component2[methodName]).toHaveBeenCalled();
  };

  it("initialises existing players when the script loads", () => {
    fireScriptEventAndExpectComponentMethodToBeCalled("onload", "initVideojs");
  });

  it("triggers an error on existing players when the script fails to load", () => {
    fireScriptEventAndExpectComponentMethodToBeCalled("onerror", "handleError");
  });
});
