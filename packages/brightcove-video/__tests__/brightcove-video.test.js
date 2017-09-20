/* eslint-env jest */

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

it("renders poster correctly before launch", () => {
  const tree = renderer
    .create(
      <BrightcoveVideo
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
        poster={{
          uri:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders poster with custom play icon if specified", () => {
  const tree = renderer
    .create(
      <BrightcoveVideo
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
        playIcon={playIconEmoji()}
        poster={{
          uri:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("will launch if play is called", () => {
  const root = renderer.create(
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{
        uri:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
      }}
    />
  );

  const rootInstance = root.getInstance();

  rootInstance.play();

  expect(root.toJSON()).toMatchSnapshot();
});

it("will reset properly", () => {
  const root = renderer.create(
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{
        uri:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
      }}
      autoplay
    />
  );

  const rootInstance = root.getInstance();

  rootInstance.reset();

  expect(root.toJSON()).toMatchSnapshot();
});

it("will call child components play and pause methods if child component is ready", () => {
  const root = renderer.create(
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{
        uri:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
      }}
      autoplay
    />
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
