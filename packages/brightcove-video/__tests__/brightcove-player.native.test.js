/* eslint-env jest */

import "react-native";
import React, { Component } from "react";
import renderer from "react-test-renderer";
import BrightcovePlayer from "../brightcove-player.native";

describe("brightcove-player native component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("width x height default to 320 x 180", () => {
    const tree = renderer
      .create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
        />
      )
      .toJSON();

    expect(tree.props.style.width).toBe(320);
    expect(tree.props.style.height).toBe(180);
  });

  it("width x height can be overridden", () => {
    const tree = renderer
      .create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          height={400}
          width={600}
        />
      )
      .toJSON();

    expect(tree.props.style.width).toBe(600);
    expect(tree.props.style.height).toBe(400);
  });

  it("passes accountId, videoId & policyKey to video correctly", () => {
    const tree = renderer
      .create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
        />
      )
      .toJSON();

    expect(tree.props.policyKey).toBe("[POLICY_KEY]");
    expect(tree.props.videoId).toBe("[VIDEO_ID]");
    expect(tree.props.accountId).toBe("[ACCOUNT_ID]");
  });

  it("will call passed 'runNativeCommand' method property with 'play' when play is called", done => {
    const root = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        videoId="[VIDEO_ID]"
        policyKey="[POLICY_KEY]"
        runNativeCommand={commandName => {
          expect(commandName).toBe("play");

          done();
        }}
      />
    );

    const rootInstance = root.getInstance();

    rootInstance.play();
  });

  it("will call passed 'runNativeCommand' method property with 'pause' when pause is called", done => {
    const root = renderer.create(
      <BrightcovePlayer
        accountId="[ACCOUNT_ID]"
        videoId="[VIDEO_ID]"
        policyKey="[POLICY_KEY]"
        runNativeCommand={commandName => {
          expect(commandName).toBe("pause");

          done();
        }}
      />
    );

    const rootInstance = root.getInstance();

    rootInstance.pause();
  });

  it("will return the native class name", () => {
    expect(BrightcovePlayer.getNativeClassName()).toBe("RNTBrightcove");
  });

  describe("Component App State handling", () => {
    let rootInstance;
    let pauseSpy;
    let playSpy;

    beforeEach(() => {
      const root = renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
        />
      );

      rootInstance = root.getInstance();

      pauseSpy = jest.spyOn(rootInstance, "pause");
      playSpy = jest.spyOn(rootInstance, "play");
    });

    afterEach(() => {
      pauseSpy.mockRestore();
      playSpy.mockRestore();
    });

    it("will handle an initial app state update (active)", () => {
      rootInstance.handleAppStateChange("active");

      expect(rootInstance.state.appState).toBe("active");

      expect(pauseSpy.mock.calls.length).toBe(0);
      expect(playSpy.mock.calls.length).toBe(0);
    });

    it("will handle an initial app state update (not active)", () => {
      rootInstance.handleAppStateChange("inactive");

      expect(rootInstance.state.appState).toBe("inactive");

      expect(pauseSpy.mock.calls.length).toBe(0);
      expect(playSpy.mock.calls.length).toBe(0);
    });

    it("will handle an app state update (not active) whilst playing - causing player to pause & flag to start again when app is active again", () => {
      rootInstance.state.isPlaying = true;

      rootInstance.handleAppStateChange("inactive");

      expect(rootInstance.state.appState).toBe("inactive");
      expect(rootInstance.state.wasPlayingBeforeAppBackgrounded).toBe(true);

      expect(pauseSpy.mock.calls.length).toBe(1);
      expect(playSpy.mock.calls.length).toBe(0);
    });

    it("will handle an app state update (active) whilst having the 'wasPlayingBeforeAppBackgrounded' flag set to true - causing player to start playing again", () => {
      rootInstance.state.wasPlayingBeforeAppBackgrounded = true;

      rootInstance.handleAppStateChange("active");

      expect(rootInstance.state.appState).toBe("active");
      expect(rootInstance.state.wasPlayingBeforeAppBackgrounded).toBe(false);

      expect(pauseSpy.mock.calls.length).toBe(0);
      expect(playSpy.mock.calls.length).toBe(1);
    });

    it("will only call play once if two 'active' events are recieved in succession", () => {
      rootInstance.state.wasPlayingBeforeAppBackgrounded = true;

      rootInstance.handleAppStateChange("active");
      rootInstance.handleAppStateChange("active");

      expect(rootInstance.state.appState).toBe("active");
      expect(rootInstance.state.wasPlayingBeforeAppBackgrounded).toBe(false);

      expect(pauseSpy.mock.calls.length).toBe(0);
      expect(playSpy.mock.calls.length).toBe(1);
    });
  });

  describe("mock RNTBrightcove", () => {
    let getNativeBrightcoveComponentSpy;
    let mockRNTBrightcove;
    let propsCache;

    beforeEach(() => {
      mockRNTBrightcove = class extends Component {
        constructor(props) {
          super(props);
          propsCache = props;
        }
        render() {
          return null;
        }
      };

      getNativeBrightcoveComponentSpy = jest
        .spyOn(BrightcovePlayer, "getNativeBrightcoveComponent")
        .mockImplementation(() => mockRNTBrightcove);
    });

    afterEach(() => {
      getNativeBrightcoveComponentSpy.mockRestore();
    });

    it("will ignore unrecognised props in native change event", () => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
        />
      );

      propsCache.onChange({ nativeEvent: { random: "act of kindness" } });
    });

    it("trigger a play event", done => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          onPlay={done}
        />
      );

      propsCache.onChange({ nativeEvent: { isPlaying: true } });
    });

    it("trigger a pause event", done => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          onPause={done}
        />
      );

      propsCache.onChange({ nativeEvent: { isPlaying: true } });
      propsCache.onChange({ nativeEvent: { isPlaying: false } });
    });

    it("trigger a pause event", done => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          onDuration={duration => {
            expect(duration).toBe(999);
            done();
          }}
        />
      );

      propsCache.onChange({ nativeEvent: { duration: 999 } });
    });

    it("trigger a finish event", done => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          onFinish={done}
        />
      );

      propsCache.onChange({ nativeEvent: { isFinished: true } });
    });

    it("will correctly handle native (android) errors", done => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          onError={evt => {
            expect(evt).toBe("random act of badness");
            done();
          }}
        />
      );

      propsCache.onLoadingError({ nativeEvent: "random act of badness" });
    });

    it("will correctly handle native (iOS) errors", done => {
      renderer.create(
        <BrightcovePlayer
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          policyKey="[POLICY_KEY]"
          onError={evt => {
            expect(evt).toBe("random act of badness");
            done();
          }}
        />
      );

      propsCache.onIOSError({ nativeEvent: "random act of badness" });
    });
  });
});
