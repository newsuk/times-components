/* eslint import/no-unresolved: "off" */

import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from "@storybook/addon-actions";

import Player from "./brightcove-player";
import VideoAdder from "./fixtures/player-adder";
import VideoWithExternalControls from "./fixtures/player-with-external-controls";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";

const firstArgJSONAction = decorateAction([args => [JSON.stringify(args[0])]]);

storiesOf("Brightcove Player", module)
  .add("Default values", () =>
    <Player policyKey={policyKey} videoId={videoId} accountId={accountId} />
  )
  .add("Large player", () =>
    <Player
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  )
  .add("Hidden Fullscreen button", () =>
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  )
  .add("Fullscreen player with hidden Fullscreen button", () =>
    <Player
      width="100%"
      height="100%"
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  )
  .add("Two players", () =>
    <View>
      <Player
        width={300}
        height={200}
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
      <Player
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
      <Player
        width={320}
        height={200}
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
      />
      <Player
        width={320}
        height={200}
        policyKey={policyKey}
        videoId="1532562858001"
        accountId={accountId}
      />
    </View>
  )
  .add("With poster image", () =>
    <Player
      width={320}
      height={200}
      policyKey={policyKey}
      poster="http://i.imgur.com/Pb5osPZ.jpg"
      videoId="1532562858001"
      accountId={accountId}
    />
  )
  .add("Bad video id", () =>
    <Player
      width={800}
      height={600}
      policyKey={policyKey}
      videoId="x"
      accountId={accountId}
      onError={firstArgJSONAction("error")}
    />
  )
  .add("Bad account id", () =>
    <Player
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId="x"
      onError={firstArgJSONAction("error")}
    />
  )
  .add("With event listener", () =>
    <Player
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
  )
  .add("With autoplay", () =>
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      autoplay
    />
  )
  .add("With autoplay & event listner", () =>
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onChange={firstArgJSONAction("change")}
      autoplay
    />
  );
