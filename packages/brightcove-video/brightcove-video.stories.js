/* eslint import/no-unresolved: "off" */

import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from "@storybook/addon-actions";

import BrightcoveVideo from "./brightcove-video";
import VideoAdder from "./fixtures/video-adder";
import VideoWithExternalControls from "./fixtures/video-with-external-controls";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

const firstArgJSONAction = decorateAction([args => [JSON.stringify(args[0])]]);

storiesOf("BrightcoveVideo", module)
  .add("Default values", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Large player", () => (
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Hidden Fullscreen button", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  ))
  .add("Fullscreen player with hidden Fullscreen button", () => (
    <BrightcoveVideo
      width="100%"
      height="100%"
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  ))
  .add("Two players", () => (
    <View>
      <BrightcoveVideo
        width={300}
        height={200}
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
      <BrightcoveVideo
        width={320}
        height={200}
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
    </View>
  ))
  .add("Lazy load players", () => (
    <VideoAdder policyKey={policyKey} videoId={videoId} accountId={accountId} />
  ))
  .add("With different videos", () => (
    <View>
      <BrightcoveVideo
        width={320}
        height={200}
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
      <BrightcoveVideo
        width={320}
        height={200}
        policyKey={policyKey}
        videoId="1532562858001"
        accountId={accountId}
      />
    </View>
  ))
  .add("With poster image", () => (
    <BrightcoveVideo
      width={320}
      height={200}
      policyKey={policyKey}
      poster="http://i.imgur.com/Pb5osPZ.jpg"
      videoId="1532562858001"
      accountId={accountId}
    />
  ))
  .add("Bad video id", () => (
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId="x"
      accountId={accountId}
      onError={firstArgJSONAction("error")}
    />
  ))
  .add("Bad account id", () => (
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId="x"
      onError={firstArgJSONAction("error")}
    />
  ))
  .add("With event listener", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onChange={firstArgJSONAction("change")}
    />
  ))
  .add("With external controls", () => (
    <VideoWithExternalControls
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("With autoplay", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      autoplay
    />
  ))
  .add("With autoplay & event listner", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onChange={firstArgJSONAction("change")}
      autoplay
    />
  ));
