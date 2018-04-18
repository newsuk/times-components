/* eslint-disable react/prop-types */

import { View, Text, Alert, Platform } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import BrightcoveVideo from "./src/brightcove-video";
import IsPaidSubscriber from "./src/is-paid-subscriber";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "57838016001";
const videoId = "4084164751001";
const posterImageURI =
  "https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";

const defaultVideoProps = {
  policyKey,
  videoId,
  accountId,
  poster: {
    uri: posterImageURI
  },
  width: 320,
  height: 180,
  onVideoPress: () => {
    Alert.alert(
      "onVideoPress called",
      "(Storybook does not play videos on native - it is handled by the host app)"
    );
  }
};

export default {
  name: "Primitives/BrightcoveVideo",
  children: [
    {
      type: "story",
      name: "default player",
      component: () => <BrightcoveVideo {...defaultVideoProps} />
    },
    {
      type: "story",
      name: "two players with different sizes",
      component: () => (
        <View>
          <BrightcoveVideo {...defaultVideoProps} width={400} />
          <View style={{ height: 20 }} />
          <BrightcoveVideo {...defaultVideoProps} height={250} />
        </View>
      )
    },
    {
      type: "story",
      name: "two players with different videos",
      component: () => (
        <View>
          <BrightcoveVideo {...defaultVideoProps} />
          <View style={{ height: 20 }} />
          <BrightcoveVideo {...defaultVideoProps} videoId="1532562858001" />
        </View>
      )
    },
    {
      type: "story",
      name: "100% width and height",
      platform: "native",
      component: () => (
        <View style={{ width: "100%", height: "100%"}}>
          <BrightcoveVideo {...defaultVideoProps} width="100%" height="100%" />
        </View>
      )
    },
    {
      type: "story",
      name: "100% width and height",
      platform: "web",
      component: () => (
        <View style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
          <BrightcoveVideo {...defaultVideoProps} width="100%" height="100%" />
        </View>
      )
    },
    {
      type: "story",
      name: "paidonly state",
      platform: "web",
      component: ({ boolean }) => (
        <View>
          <IsPaidSubscriber.Provider
            value={boolean("Is paid subscriber?", false)}
          >
            <BrightcoveVideo
              {...defaultVideoProps}
              height={250}
              paidonly={boolean("paidonly video", false)}
            />
          </IsPaidSubscriber.Provider>
        </View>
      )
    },
    {
      type: "story",
      name: "with error",
      platform: "web",
      component: () => (
        <View>
          <BrightcoveVideo {...defaultVideoProps} videoId="invalid id" />
          <Text style={{ marginTop: 20 }}>This video has an invalid id</Text>
        </View>
      )
    }
  ]
};
