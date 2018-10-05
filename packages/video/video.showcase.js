/* eslint-disable react/prop-types */
import { View, Text, Alert } from "react-native";
import React from "react";
import Video from "./src/video";
import IsPaidSubscriber from "./src/is-paid-subscriber";

const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "5436121857001";
const videoId = "5831024132001";
const posterImageURI =
  "https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";

const skySportsPosterImageURI =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F82d8be88-c422-11e8-8cd0-138e4f72a3e1.jpg?crop=1280%2C720%2C0%2C0";

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

const skySportsVideoProps = {
  ...defaultVideoProps,
  poster: {
    uri: skySportsPosterImageURI
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
          <Video {...defaultVideoProps} videoId="5612887446001" />
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
      name: "skysports video",
      component: () => (
        <View>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>Mobile size:</Text>
          <Video {...skySportsVideoProps} skySports />
          <Text style={{ marginTop: 20, marginBottom: 10 }}>Desktop size:</Text>
          <Video {...skySportsVideoProps} height={374} skySports width={664} />
          <Text style={{ marginTop: 20, marginBottom: 10 }}>
            Non sky sports:
          </Text>
          <Video {...defaultVideoProps} height={374} width={664} />
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
    },
    {
      type: "story",
      name: "no poster image",
      component: () => (
        <View>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>Mobile size:</Text>
          <Video {...defaultVideoProps} poster={null} />
          <Text style={{ marginTop: 20, marginBottom: 10 }}>Desktop size:</Text>
          <Video
            {...defaultVideoProps}
            height={374}
            poster={null}
            width={664}
          />
        </View>
      )
    }
  ]
};
