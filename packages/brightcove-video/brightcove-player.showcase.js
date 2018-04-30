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
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with large player",
      component: () => (
        <BrightcoveVideo
          width={800}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with hidden fullscreen button",
      component: () => (
        <BrightcoveVideo
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          hideFullScreenButton
        />
      )
    },
    {
      type: "story",
      name: "Launcher fullscreen player",
      component: () => (
        <BrightcoveVideo
          width="100%"
          height="100%"
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
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
            policyKey={policyKey}
            videoId={videoId}
            accountId={accountId}
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
          width="100%"
          height="100%"
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          hideFullScreenButton
        />
      )
    },
    {
      type: "story",
      name: "Two launchers",
      component: () => (
        <View style={{ width: "100%", height: "100%" }}>
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
    },
    {
      type: "story",
      name: "Launcher with different videos",
      component: () => (
        <View style={{ width: "100%", height: "100%" }}>
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
      )
    },
    {
      type: "story",
      name: "Launcher with poster image",
      component: () => (
        <BrightcoveVideo
          width={320}
          height={200}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId="1532562858001"
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with bad video id",
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          width={800}
          height={600}
          policyKey={policyKey}
          videoId="x"
          accountId={accountId}
          onError={firstArgJSONAction(decorateAction)("error")}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with poster image & bad video id",
      component: () => (
        <BrightcoveVideo
          width={440}
          height={300}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId="x"
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with bad account id",
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          width={800}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          accountId="x"
          onError={firstArgJSONAction(decorateAction)("error")}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with external controls",
      component: () => (
        <VideoWithExternalControls
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Launcher with default play icon",
      component: () => (
        <BrightcoveVideo
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          poster={{ uri: posterImageURI }}
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
            policyKey={policyKey}
            videoId={videoId}
            accountId={accountId}
            poster={{ uri: posterImageURI }}
            playIcon={playIconImage()}
          />
        );
      }
    },
    {
      type: "story",
      name: "Launcher with autoplay",
      component: () => (
        <BrightcoveVideo
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          poster={{ uri: posterImageURI }}
          autoplay
        />
      )
    },
    {
      type: "story",
      name: "Player with default values",
      component: () => (
        <Player policyKey={policyKey} videoId={videoId} accountId={accountId} />
      )
    },
    {
      type: "story",
      name: "Player with large dimensions",
      component: () => (
        <Player
          width={800}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Player with hidden fullscreen button",
      component: () => (
        <Player
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          hideFullScreenButton
        />
      )
    },
    {
      type: "story",
      name: "Player in fullscreen with hidden fullscreen button",
      component: () => (
        <Player
          width="100%"
          height="100%"
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          hideFullScreenButton
        />
      )
    },
    {
      type: "story",
      name: "Two players",
      component: () => (
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
    },
    {
      type: "story",
      name: "Players lazy loaded",
      component: () => (
        <VideoAdder
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Player with different videos",
      component: () => (
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
    },
    {
      type: "story",
      name: "Player with poster image",
      component: () => (
        <Player
          width={320}
          height={200}
          policyKey={policyKey}
          poster={{ uri: "http://i.imgur.com/Pb5osPZ.jpg" }}
          videoId="1532562858001"
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Player with bad video id",
      component: (_, { decorateAction }) => (
        <Player
          width={800}
          height={600}
          policyKey={policyKey}
          videoId="x"
          accountId={accountId}
          onError={firstArgJSONAction(decorateAction)("error")}
        />
      )
    },
    {
      type: "story",
      name: "Player with bad account id",
      component: (_, { decorateAction }) => (
        <Player
          width={800}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          accountId="x"
          onError={firstArgJSONAction(decorateAction)("error")}
        />
      )
    },
    {
      type: "story",
      name: "Player with event listeners",
      component: (_, { action }) => (
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
      )
    },
    {
      type: "story",
      name: "Launcher with event listeners",
      component: (_, { action }) => (
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
      )
    },
    {
      type: "story",
      name: "Launcher with (android only) fullscreen event listeners",
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          onEnterFullscreen={firstArgJSONAction(decorateAction)(
            "enter fullscreen"
          )}
          onExitFullscreen={firstArgJSONAction(decorateAction)(
            "exit fullscreen"
          )}
        />
      )
    },
    {
      type: "story",
      name: "Player with external controls",
      component: () => (
        <VideoWithExternalControls
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
        />
      )
    },
    {
      type: "story",
      name: "Player with autoplay",
      component: () => (
        <Player
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          autoplay
        />
      )
    },
    {
      type: "story",
      name: "Player with auto-play & event listener",
      component: (_, { action }) => (
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
      )
    },
    {
      type: "story",
      name: "Launcher with reset on finish",
      component: () => (
        <BrightcoveVideo
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          resetOnFinish
        />
      )
    },
    {
      type: "story",
      name: "Launcher direct to fullscreen (native only)",
      component: () => (
        <BrightcoveVideo
          policyKey={policyKey}
          videoId={videoId}
          accountId={accountId}
          directToFullscreen
        />
      )
    },
    {
      type: "story",
      name: "Launcher with custom play icon defined by emoji",
      platform: "web",
      component: () => {
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
      }
    }
  ]
};
