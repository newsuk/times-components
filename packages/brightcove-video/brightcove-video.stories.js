/* eslint import/no-unresolved: "off" */

import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
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
  .add("Default values", () =>
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  )
  .add("Large player", () =>
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  )
  .add("Two players", () =>
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
  )
  .add("Lazy load players", () =>
    <VideoAdder policyKey={policyKey} videoId={videoId} accountId={accountId} />
  )
  .add("With different videos", () =>
    <View>
      <BrightcoveVideo
        width={320}
        height={200}
        policyKey={policyKey}
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
  )
  .add("Bad video id", () =>
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId="x"
      accountId={accountId}
      onError={firstArgJSONAction("error")}
    />
  )
  .add("Bad account id", () =>
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId="x"
      onError={firstArgJSONAction("error")}
    />
  )
  .add("With event listener", () =>
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onChange={firstArgJSONAction("change")}
    />
  )
  .add("With external controls", () =>
    <VideoWithExternalControls
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  );
