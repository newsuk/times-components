import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import BrightcoveVideo from "../brightcove-video";

const policyKey = "[POLICY_KEY]";
const accountId = "[ACCOUNT_ID]";
const videoId = "[VIDEO_ID]";

const playIconEmoji = () => (
  <span role="img" aria-label="play-video">
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
  const tree = renderer
    .create(<BrightcoveVideo {...defaultVideoProps} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders poster with custom play icon if specified", () => {
  const tree = renderer
    .create(
      <BrightcoveVideo {...defaultVideoProps} playIcon={playIconEmoji()} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("will launch if play is called", () => {
  const root = renderer.create(<BrightcoveVideo {...defaultVideoProps} />);

  const rootInstance = root.getInstance();

  rootInstance.play();

  expect(root.toJSON()).toMatchSnapshot();
});

it("pauses other playing videos if play is called", () => {
  renderer.create(<BrightcoveVideo {...defaultVideoProps} />);
  renderer.create(<BrightcoveVideo {...defaultVideoProps} />);

  const [component1, component2] = BrightcoveVideo.activePlayers;
  jest.spyOn(component1, "pause");
  jest.spyOn(component2, "pause");

  component1.handlePlay();
  expect(component1.pause).not.toHaveBeenCalled();
  component2.handlePlay();
  expect(component1.pause).toHaveBeenCalled();
});

it("doesn't hold references to players after they have been unmounted", () => {
  renderer.create(<BrightcoveVideo {...defaultVideoProps} />);
  const p2 = renderer.create(<BrightcoveVideo {...defaultVideoProps} />);

  expect(BrightcoveVideo.activePlayers.length).toBe(2);
  const [component1] = BrightcoveVideo.activePlayers;
  p2.unmount();
  expect(BrightcoveVideo.activePlayers.length).toBe(1);
  expect(BrightcoveVideo.activePlayers[0]).toBe(component1);
});

it("will reset properly", () => {
  const root = renderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = root.getInstance();

  rootInstance.reset();

  expect(root.toJSON()).toMatchSnapshot();
});

it("will reset if 'resetOnFinish' is true & video finishes", done => {
  const root = renderer.create(
    <BrightcoveVideo {...defaultVideoProps} resetOnFinish />
  );

  const rootInstance = root.getInstance();

  rootInstance.play();

  rootInstance.handleFinish();

  // handleFinish calls reset asyc - wait for it
  setTimeout(() => {
    expect(root.toJSON()).toMatchSnapshot();
    done();
  }, 0);
});

it("will call child components play and pause methods if child component is ready", () => {
  const root = renderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = root.getInstance();

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
  const root = renderer.create(
    <BrightcoveVideo {...defaultVideoProps} directToFullscreen />
  );

  const rootInstance = root.getInstance();

  const mockNativeModule = {
    playVideo: jest.fn()
  };

  BrightcoveVideo.getBrightcoveFullscreenPlayerModule = () => mockNativeModule;

  rootInstance.play();

  expect(mockNativeModule.playVideo.mock.calls).toHaveLength(1);
});

it("will handle an error properly", () => {
  const root = renderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = root.getInstance();

  rootInstance.handleError({ code: "XxX", message: "a bad booboo occured" });

  expect(root.toJSON()).toMatchSnapshot();
});

it("the player can trigger errors", () => {
  const root = renderer.create(
    <BrightcoveVideo {...defaultVideoProps} autoplay />
  );

  const rootInstance = root.getInstance();

  rootInstance.setState({ isLaunched: true });

  rootInstance.playerRef.bcv.onError({
    nativeEvent: {
      code: "XxX",
      message: "a bad booboo occured"
    }
  });

  expect(root.toJSON()).toMatchSnapshot();
});
