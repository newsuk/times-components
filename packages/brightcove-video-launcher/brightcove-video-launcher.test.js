/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import BrightcoveVideoLauncher from "./brightcove-video-launcher";

import customPlayIcon from "./fixtures/customPlayIcon.png";

const policyKey = "[POLICY_KEY]";
const accountId = "[ACCOUNT_ID]";
const videoId = "[VIDEO_ID]";

it("renders poster correctly before launch", () => {
  const tree = renderer
    .create(
      <BrightcoveVideoLauncher
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders poster with custom play icon if specified", () => {
  const tree = renderer
    .create(
      <BrightcoveVideoLauncher
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
        playIcon={customPlayIcon}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("launches a video correctly", () => {
  const root = renderer.create(
    <BrightcoveVideoLauncher
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  );

  const rootInstance = root.getInstance();

  rootInstance.launchVideo();

  expect(root.toJSON()).toMatchSnapshot();
});
