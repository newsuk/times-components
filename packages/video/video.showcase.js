/* eslint-disable react/prop-types */
import { View, Text, Alert } from "react-native";
import React from "react";
import Video from "./src/video";
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
  name: "Primitives/Video",
  children: [
    {
      type: "story",
      name: "default player",
      component: () => (
        <View>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>Mobile size:</Text>
          <Video {...defaultVideoProps} />
          <Text style={{ marginTop: 20, marginBottom: 10 }}>Desktop size:</Text>
          <Video {...defaultVideoProps} height={374} width={664} />
        </View>
      )
    },
    {
      type: "story",
      name: "two players with different videos",
      component: () => (
        <View>
          <Video {...defaultVideoProps} />
          <View style={{ height: 20 }} />
          <Video {...defaultVideoProps} videoId="1532562858001" />
        </View>
      )
    },
    {
      type: "story",
      name: "100% width and height",
      platform: "native",
      component: () => (
        <View style={{ width: "100%", height: "100%" }}>
          <Video {...defaultVideoProps} height="100%" width="100%" />
        </View>
      )
    },
    {
      type: "story",
      name: "100% width and height",
      platform: "web",
      component: () => (
        <View style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
          <Video {...defaultVideoProps} height="100%" width="100%" />
        </View>
      )
    },
    {
      type: "story",
      name: "paidOnly state",
      platform: "web",
      component: ({ boolean }) => (
        <View>
          <IsPaidSubscriber.Provider
            value={boolean("Is paid subscriber?", false)}
          >
            <Video
              {...defaultVideoProps}
              paidOnly={boolean("paidOnly video", false)}
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
          <Text style={{ marginTop: 10, marginBottom: 10 }}>Mobile size:</Text>
          <Video {...defaultVideoProps} videoId="invalid id" />
          <Text style={{ marginTop: 20, marginBottom: 10 }}>Desktop size:</Text>
          <Video
            {...defaultVideoProps}
            height={374}
            videoId="invalid id"
            width={664}
          />
        </View>
      )
    }
  ]
};
