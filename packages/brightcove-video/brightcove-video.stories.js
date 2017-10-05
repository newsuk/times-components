import React from "react";
import { View, Image } from "react-native";

// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action, decorateAction } from "@storybook/addon-actions";
import BrightcoveVideo from "./brightcove-video";
import Player from "./brightcove-player";

import VideoAdder from "./fixtures/player-adder";
import VideoWithExternalControls from "./fixtures/video-with-external-controls";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";
const posterImageURI =
  "https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";
const playIconURI = "https://i.imgur.com/qvmvjzE.png";

const firstArgJSONAction = decorateAction([args => [JSON.stringify(args[0])]]);

storiesOf("BrightcoveVideo", module)
  .add("Launcher with default values", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Launcher with large player", () => (
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Launcher with hidden fullscreen button", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  ))
  .add("Launcher fullscreen player with hidden Fullscreen button", () => (
    <BrightcoveVideo
      width="100%"
      height="100%"
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  ))
  .add("Two launchers", () => (
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
  .add("Launcher with different videos", () => (
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
  .add("Launcher with poster image", () => (
    <BrightcoveVideo
      width={320}
      height={200}
      policyKey={policyKey}
      poster={{ uri: "http://i.imgur.com/Pb5osPZ.jpg" }}
      videoId="1532562858001"
      accountId={accountId}
    />
  ))
  .add("Launcher with bad video id", () => (
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId="x"
      accountId={accountId}
      onError={firstArgJSONAction("error")}
    />
  ))
  .add("Launcher with bad account id", () => (
    <BrightcoveVideo
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId="x"
      onError={firstArgJSONAction("error")}
    />
  ))
  .add("Launcher with event listener", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onChange={firstArgJSONAction("change")}
    />
  ))
  .add("Launcher with external controls", () => (
    <VideoWithExternalControls
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Launcher with default play icon", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{ uri: posterImageURI }}
    />
  ))
  .add("Launcher with custom play icon defined by emoji", () => {
    const playIconEmoji = () => (
      <span role="img" aria-label="play-video">
        ▶️
      </span>
    );

    return (
      <BrightcoveVideo
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
        poster={{ uri: posterImageURI }}
        playIcon={playIconEmoji()}
      />
    );
  })
  .add("Launcher with play icon defined by Image component", () => {
    const playIconImage = () => (
      <Image source={{ uri: playIconURI }} style={{ width: 70, height: 70 }} />
    );

    return (
      <BrightcoveVideo
        policyKey={policyKey}
        videoId={videoId}
        accountId={accountId}
        poster={{ uri: posterImageURI }}
        playIcon={playIconImage()}
      />
    );
  })
  .add("Launcher with autoplay", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      poster={{ uri: posterImageURI }}
      autoplay
    />
  ))
  .add("Player with default values", () => (
    <Player policyKey={policyKey} videoId={videoId} accountId={accountId} />
  ))
  .add("Player with large dimensions", () => (
    <Player
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Player with hidden fullscreen button", () => (
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      hideFullScreenButton
    />
  ))
  .add("Player in fullscreen with hidden fullscreen button", () => (
    <Player
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
  ))
  .add("Players lazy loaded", () => (
    <VideoAdder policyKey={policyKey} videoId={videoId} accountId={accountId} />
  ))
  .add("Player with different videos", () => (
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
  ))
  .add("Player with poster image", () => (
    <Player
      width={320}
      height={200}
      policyKey={policyKey}
      poster={{ uri: "http://i.imgur.com/Pb5osPZ.jpg" }}
      videoId="1532562858001"
      accountId={accountId}
    />
  ))
  .add("Player with bad video id", () => (
    <Player
      width={800}
      height={600}
      policyKey={policyKey}
      videoId="x"
      accountId={accountId}
      onError={firstArgJSONAction("error")}
    />
  ))
  .add("Player with bad account id", () => (
    <Player
      width={800}
      height={600}
      policyKey={policyKey}
      videoId={videoId}
      accountId="x"
      onError={firstArgJSONAction("error")}
    />
  ))
  .add("Player with event listeners", () => (
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onPlay={action("play")}
      onPause={action("pause")}
      onProgress={action("progress")}
      onFinish={action("finish")}
      onDuration={action("duration")}
    />
  ))
  .add("Launcher with event listeners", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onPlay={action("play")}
      onPause={action("pause")}
      onProgress={action("progress")}
      onFinish={action("finish")}
      onDuration={action("duration")}
    />
  ))
  .add("Player with external controls", () => (
    <VideoWithExternalControls
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
    />
  ))
  .add("Player with autoplay", () => (
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      autoplay
    />
  ))
  .add("Player with autoplay & event listner", () => (
    <Player
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      onPlay={action("play")}
      onPause={action("pause")}
      onProgress={action("progress")}
      onFinish={action("finish")}
      onDuration={action("duration")}
      autoplay
    />
  ))
  .add("Launcher with reset on finish", () => (
    <BrightcoveVideo
      policyKey={policyKey}
      videoId={videoId}
      accountId={accountId}
      resetOnFinish
    />
  ));
