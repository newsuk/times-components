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
  children: [
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Launcher with default values",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      ),
      name: "Launcher with large player",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Launcher with hidden fullscreen button",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height="100%"
          policyKey={policyKey}
          videoId={videoId}
          width="100%"
        />
      ),
      name: "Launcher fullscreen player",
      type: "story"
    },
    {
      component: () => (
        <View
          style={{
            height: "100%",
            width: "100%"
          }}
        >
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
      ),
      name: "Inline launcher with default values to demonstrate fullscreen",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height="100%"
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
          width="100%"
        />
      ),
      name: "Launcher fullscreen player with hidden Fullscreen button",
      type: "story"
    },
    {
      component: () => (
        <View
          style={{
            height: "100%",
            width: "100%"
          }}
        >
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
      ),
      name: "Two launchers",
      type: "story"
    },
    {
      component: () => (
        <View
          style={{
            height: "100%",
            width: "100%"
          }}
        >
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
      ),
      name: "Launcher with different videos",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height={200}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId="1532562858001"
          width={320}
        />
      ),
      name: "Launcher with poster image",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          accountId={accountId}
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId="x"
          width={800}
        />
      ),
      name: "Launcher with bad video id",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          height={300}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId="x"
          width={440}
        />
      ),
      name: "Launcher with poster image & bad video id",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <BrightcoveVideo
          accountId="x"
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      ),
      name: "Launcher with bad account id",
      type: "story"
    },
    {
      component: () => (
        <VideoWithExternalControls
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Launcher with external controls",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId={videoId}
        />
      ),
      name: "Launcher with default play icon",
      type: "story"
    },
    {
      component: () => {
        const playIconImage = () => (
          <Image
            source={{ uri: playIconURI }}
            style={{
              height: 70,
              width: 70
            }}
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
      },
      name: "Launcher with play icon defined by Image component",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          autoplay
          policyKey={policyKey}
          poster={{ uri: posterImageURI }}
          videoId={videoId}
        />
      ),
      name: "Launcher with autoplay",
      type: "story"
    },
    {
      component: () => (
        <Player accountId={accountId} policyKey={policyKey} videoId={videoId} />
      ),
      name: "Player with default values",
      type: "story"
    },
    {
      component: () => (
        <Player
          accountId={accountId}
          height={600}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      ),
      name: "Player with large dimensions",
      type: "story"
    },
    {
      component: () => (
        <Player
          accountId={accountId}
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Player with hidden fullscreen button",
      type: "story"
    },
    {
      component: () => (
        <Player
          accountId={accountId}
          height="100%"
          hideFullScreenButton
          policyKey={policyKey}
          videoId={videoId}
          width="100%"
        />
      ),
      name: "Player in fullscreen with hidden fullscreen button",
      type: "story"
    },
    {
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
      ),
      name: "Two players",
      type: "story"
    },
    {
      component: () => (
        <VideoAdder
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Players lazy loaded",
      type: "story"
    },
    {
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
      ),
      name: "Player with different videos",
      type: "story"
    },
    {
      component: () => (
        <Player
          accountId={accountId}
          height={200}
          policyKey={policyKey}
          poster={{ uri: "http://i.imgur.com/Pb5osPZ.jpg" }}
          videoId="1532562858001"
          width={320}
        />
      ),
      name: "Player with poster image",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <Player
          accountId={accountId}
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId="x"
          width={800}
        />
      ),
      name: "Player with bad video id",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <Player
          accountId="x"
          height={600}
          onError={firstArgJSONAction(decorateAction)("error")}
          policyKey={policyKey}
          videoId={videoId}
          width={800}
        />
      ),
      name: "Player with bad account id",
      type: "story"
    },
    {
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
      ),
      name: "Player with event listeners",
      type: "story"
    },
    {
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
      ),
      name: "Launcher with event listeners",
      type: "story"
    },
    {
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
      ),
      name: "Launcher with (android only) fullscreen event listeners",
      type: "story"
    },
    {
      component: () => (
        <VideoWithExternalControls
          accountId={accountId}
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Player with external controls",
      type: "story"
    },
    {
      component: () => (
        <Player
          accountId={accountId}
          autoplay
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Player with autoplay",
      type: "story"
    },
    {
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
      ),
      name: "Player with auto-play & event listener",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          policyKey={policyKey}
          resetOnFinish
          videoId={videoId}
        />
      ),
      name: "Launcher with reset on finish",
      type: "story"
    },
    {
      component: () => (
        <BrightcoveVideo
          accountId={accountId}
          directToFullscreen
          policyKey={policyKey}
          videoId={videoId}
        />
      ),
      name: "Launcher direct to fullscreen (native only)",
      type: "story"
    },
    {
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
      },
      name: "Launcher with custom play icon defined by emoji",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Brightcove Player"
};
