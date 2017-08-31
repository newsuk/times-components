/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import BrightcoveVideoLauncher from "./brightcove-video-launcher";

const policyKey = "[POLICY_KEY]";
const accountId = "[ACCOUNT_ID]";
const videoId = "[VIDEO_ID]";

it("renders correctly", () => {
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
