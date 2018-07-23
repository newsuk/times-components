import React from "react";
import TestRenderer from "react-test-renderer";
import BrightcoveVideo from "../src/brightcove-video";

const policyKey = "[POLICY_KEY]";
const accountId = "[ACCOUNT_ID]";
const videoId = "[VIDEO_ID]";

const playIconEmoji = () => (
  <span aria-label="play-video" role="img">
    ▶️
  </span>
);

const defaultVideoProps = {
  policyKey,
  videoId,
  accountId,
  poster: {
    uri:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
  }
};

beforeEach(() => {
  BrightcoveVideo.activePlayers = [];
});

it("renders poster correctly before launch", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} />
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("renders poster with custom play icon if specified", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} playIcon={playIconEmoji()} />
  ).toJSON();

  expect(testInstance).toMatchSnapshot();
});

it("will launch if play is called", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} />
  );

  const rootInstance = testInstance.getInstance();

  rootInstance.play();

  expect(testInstance.toJSON()).toMatchSnapshot();
});

it("pauses other playing videos if play is called", () => {
  TestRenderer.create(<BrightcoveVideo {...defaultVideoProps} />);
  TestRenderer.create(<BrightcoveVideo {...defaultVideoProps} />);

  const [component1, component2] = BrightcoveVideo.activePlayers;
  jest.spyOn(component1, "pause");
  jest.spyOn(component2, "pause");

  component1.handlePlay();
  expect(component1.pause).not.toHaveBeenCalled();
  component2.handlePlay();
  expect(component1.pause).toHaveBeenCalled();
});

it("doesn't hold references to players after they have been unmounted", () => {
  TestRenderer.create(<BrightcoveVideo {...defaultVideoProps} />);
  const p2 = TestRenderer.create(<BrightcoveVideo {...defaultVideoProps} />);

  expect(BrightcoveVideo.activePlayers.length).toBe(2);
  const [component1] = BrightcoveVideo.activePlayers;
  p2.unmount();
  expect(BrightcoveVideo.activePlayers.length).toBe(1);
  expect(BrightcoveVideo.activePlayers[0]).toBe(component1);
});

it("will reset properly", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = testInstance.getInstance();

  rootInstance.reset();

  expect(testInstance.toJSON()).toMatchSnapshot();
});

it("will reset if 'resetOnFinish' is true & video finishes", done => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} resetOnFinish />
  );

  const rootInstance = testInstance.getInstance();

  rootInstance.play();

  rootInstance.handleFinish();

  // handleFinish calls reset asyc - wait for it
  setTimeout(() => {
    expect(testInstance.toJSON()).toMatchSnapshot();
    done();
  }, 0);
});

it("will call child components play and pause methods if child component is ready", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = testInstance.getInstance();

  rootInstance.playerRef = {
    play: jest.fn(),
    pause: jest.fn()
  };

  rootInstance.play();

  expect(rootInstance.playerRef.play.mock.calls).toHaveLength(1);
  expect(rootInstance.playerRef.pause.mock.calls).toHaveLength(0);

  rootInstance.pause();

  expect(rootInstance.playerRef.play.mock.calls).toHaveLength(1);
  expect(rootInstance.playerRef.pause.mock.calls).toHaveLength(1);
});

it("will call native fullscreen player if 'directToFullscreen option passed'", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} directToFullscreen />
  );

  const rootInstance = testInstance.getInstance();

  const mockNativeModule = {
    playVideo: jest.fn()
  };

  BrightcoveVideo.getBrightcoveFullscreenPlayerModule = () => mockNativeModule;

  rootInstance.play();

  expect(mockNativeModule.playVideo.mock.calls).toHaveLength(1);
});

it("will handle an error properly", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = testInstance.getInstance();

  rootInstance.handleError({ code: "XxX", message: "a bad booboo occured" });

  expect(testInstance.toJSON()).toMatchSnapshot();
});

it("the player can trigger errors", () => {
  const testInstance = TestRenderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = testInstance.getInstance();

  rootInstance.setState({ isLaunched: true });

  rootInstance.playerRef.bcv.onError({
    nativeEvent: {
      code: "XxX",
      message: "a bad booboo occured"
    }
  });

  expect(testInstance.toJSON()).toMatchSnapshot();
});
