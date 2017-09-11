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
