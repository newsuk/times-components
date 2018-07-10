import React from "react";
import { View, Image, Text } from "react-native";

import BrightcoveVideo from "./src/brightcove-video";
import Player from "./src/brightcove-player";

import VideoAdder from "./fixtures/player-adder";
import VideoWithExternalControls from "./fixtures/video-with-external-controls";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";
const posterImageURI =
  "https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";
const playIconURI = "https://i.imgur.com/qvmvjzE.png";

const firstArgJSONAction = decorateAction =>
  decorateAction([args => [JSON.stringify(args[0])]]);

export default {
  name: "Primitives/Brightcove Player",
  children: [
    {
      type: "story",
      name: "Launcher with default values",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with large player",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with hidden fullscreen button",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher fullscreen player",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height="100%"
          policyKey={policyKey}
          videoId={videoId}
          width="100%"
        />
      )
    },
    {
      type: "story",
      name: "Inline launcher with default values to demonstrate fullscreen",
      component: () => (
        <View style={{ width: "100%", height: "100%" }}>
          <Text>Line 1</Text>
          <Text>Line 2</Text>
          <Text>Line 3</Text>
          <BrightcoveVideo
            accountId={accountId}
            policyKey={policyKey}
            videoId={videoId}
          />
          <Text>Line 4</Text>
          <Text>Line 5</Text>
          <Text>Line 6</Text>
        </View>
      )
    },
    {
      type: "story",
      name: "Launcher fullscreen player with hidden Fullscreen button",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height="100%"
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
          width="100%"
        />
      )
    },
    {
      type: "story",
      name: "Two launchers",
      component: () => (
        <View style={{ width: "100%", height: "100%" }}>
          <BrightcoveVideo
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId={videoId}
            width={300}
          />
          <BrightcoveVideo
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId={videoId}
            width={320}
          />
        </View>
      )
    },
    {
      type: "story",
      name: "Launcher with different videos",
      component: () => (
        <View style={{ width: "100%", height: "100%" }}>
          <BrightcoveVideo
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId={videoId}
            width={320}
          />
          <BrightcoveVideo
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId="1532562858001"
            width={320}
          />
        </View>
      )
    },
    {
      type: "story",
      name: "Launcher with poster image",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height={200}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId="1532562858001"
          width={320}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with bad video id",
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          accountId={accountId}
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId="x"
          width={800}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with poster image & bad video id",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height={300}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId="x"
          width={440}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with bad account id",
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          accountId="x"
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with external controls",
      component: () => (
        <VideoWithExternalControls
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with default play icon",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with play icon defined by Image component",
      component: () => {
        const playIconImage = () => (
          <Image
            source={{ uri: playIconURI }}
            style={{ width: 70, height: 70 }}
          />
        );

        return (
          <BrightcoveVideo
            accountId={accountId}
            playIcon={playIconImage()}
            policyKey={policyKey}
            poster={{ uri: posterImageURI }}
            videoId={videoId}
          />
        );
      }
    },
    {
      type: "story",
      name: "Launcher with autoplay",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          autoplay
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Player with default values",
      component: () => (
        <Player accountId={accountId} policyKey={policyKey} videoId={videoId} />
      )
    },
    {
      type: "story",
      name: "Player with large dimensions",
      component: () => (
        <Player
          accountId={accountId}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      )
    },
    {
      type: "story",
      name: "Player with hidden fullscreen button",
      component: () => (
        <Player
          accountId={accountId}
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Player in fullscreen with hidden fullscreen button",
      component: () => (
        <Player
          accountId={accountId}
          height="100%"
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
          width="100%"
        />
      )
    },
    {
      type: "story",
      name: "Two players",
      component: () => (
        <View>
          <Player
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId={videoId}
            width={300}
          />
          <Player
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId={videoId}
            width={320}
          />
        </View>
      )
    },
    {
      type: "story",
      name: "Players lazy loaded",
      component: () => (
        <VideoAdder
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Player with different videos",
      component: () => (
        <View>
          <Player
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId={videoId}
            width={320}
          />
          <Player
            accountId={accountId}
            height={200}
            policyKey={policyKey}
            videoId="1532562858001"
            width={320}
          />
        </View>
      )
    },
    {
      type: "story",
      name: "Player with poster image",
      component: () => (
        <Player
          accountId={accountId}
          height={200}
          policyKey={policyKey}
          poster={{ uri: "http://i.imgur.com/Pb5osPZ.jpg" }}
          videoId="1532562858001"
          width={320}
        />
      )
    },
    {
      type: "story",
      name: "Player with bad video id",
      component: (_, { decorateAction }) => (
        <Player
          accountId={accountId}
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId="x"
          width={800}
        />
      )
    },
    {
      type: "story",
      name: "Player with bad account id",
      component: (_, { decorateAction }) => (
        <Player
          accountId="x"
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      )
    },
    {
      type: "story",
      name: "Player with event listeners",
      component: (_, { action }) => (
        <Player
          accountId={accountId}
          onDuration={action("duration")}
          onFinish={action("finish")}
          onPause={action("pause")}
          onPlay={action("play")}
          onProgress={action("progress")}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with event listeners",
      component: (_, { action }) => (
        <BrightcoveVideo
          accountId={accountId}
          onDuration={action("duration")}
          onFinish={action("finish")}
          onPause={action("pause")}
          onPlay={action("play")}
          onProgress={action("progress")}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with (android only) fullscreen event listeners",
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          accountId={accountId}
          onEnterFullscreen={firstArgJSONAction(decorateAction)(
            "enter fullscreen"
          )}
          onExitFullscreen={firstArgJSONAction(decorateAction)(
            "exit fullscreen"
          )}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Player with external controls",
      component: () => (
        <VideoWithExternalControls
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Player with autoplay",
      component: () => (
        <Player
          accountId={accountId}
          autoplay
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Player with auto-play & event listener",
      component: (_, { action }) => (
        <Player
          accountId={accountId}
          autoplay
          onDuration={action("duration")}
          onFinish={action("finish")}
          onPause={action("pause")}
          onPlay={action("play")}
          onProgress={action("progress")}
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with reset on finish",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          policyKey={policyKey}
          resetOnFinish
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher direct to fullscreen (native only)",
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          directToFullscreen
          policyKey={policyKey}
          videoId={videoId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with custom play icon defined by emoji",
      platform: "web",
      component: () => {
        const playIconEmoji = () => (
          <span aria-label="play-video" role="img">
            ▶️
          </span>
        );

        return (
          <BrightcoveVideo
            accountId={accountId}
            playIcon={playIconEmoji()}
            policyKey={policyKey}
            poster={{ uri: posterImageURI }}
            videoId={videoId}
          />
        );
      }
    }
  ]
};
