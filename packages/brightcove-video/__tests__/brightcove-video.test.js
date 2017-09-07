/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import BrightcoveVideo from "../brightcove-video";

import customPlayIcon from "../fixtures/customPlayIcon.png";

const policyKey = "[POLICY_KEY]";
const accountId = "[ACCOUNT_ID]";
const videoId = "[VIDEO_ID]";

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
        playIcon={customPlayIcon}
        poster={{
          uri:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
        }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it.skip("launches a video correctly", () => {
  const video = mount(
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

  video.find("TouchableWithoutFeedback").first().props().onPress();
  //console.log(video);
  //expect(video).toMatchSnapshot();
});
