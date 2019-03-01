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
  accountId,
  height: 180,
  onVideoPress: () => {
    Alert.alert(
      "onVideoPress called",
      "(Storybook does not play videos on native - it is handled by the host app)"
    );
  },
  policyKey,
  poster: {
    uri: posterImageURI
  },
  videoId,
  width: 320
};

const skySportsVideoProps = {
  ...defaultVideoProps,
  poster: {
    uri: skySportsPosterImageURI
  }
};

export default {
  children: [
    {
      component: () => (
        <View>
          <Text
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </Text>
          <Video {...defaultVideoProps} />
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </Text>
          <Video {...defaultVideoProps} height={374} width={664} />
        </View>
      ),
      name: "default player",
      type: "story"
    },
    {
      component: () => {
        const props = { playerId: "y4yoiFCf1", videoId: "5992442066001" };
        return (
          <View>
            <Text
              style={{
                marginBottom: 10,
                marginTop: 10
              }}
            >
              Mobile size:
            </Text>
            <Video {...defaultVideoProps} {...props} />
            <Text
              style={{
                marginBottom: 10,
                marginTop: 20
              }}
            >
              Desktop size:
            </Text>
            <Video {...defaultVideoProps} {...props} height={374} width={664} />
          </View>
        );
      },
      name: "360 player",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <View>
          <Video {...defaultVideoProps} />
          <View style={{ height: 20 }} />
          <Video {...defaultVideoProps} videoId="5612887446001" />
        </View>
      ),
      name: "two players with different videos",
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
          <Video {...defaultVideoProps} height="100%" width="100%" />
        </View>
      ),
      name: "100% width and height",
      platform: "native",
      type: "story"
    },
    {
      component: () => (
        <View
          style={{
            height: "100vh",
            overflow: "hidden",
            width: "100vw"
          }}
        >
          <Video {...defaultVideoProps} height="100%" width="100%" />
        </View>
      ),
      name: "100% width and height",
      platform: "web",
      type: "story"
    },
    {
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
      ),
      name: "paidOnly state",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <View>
          <Text
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </Text>
          <Video {...skySportsVideoProps} skySports />
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </Text>
          <Video {...skySportsVideoProps} height={374} skySports width={664} />
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Non sky sports:
          </Text>
          <Video {...defaultVideoProps} height={374} width={664} />
        </View>
      ),
      name: "skysports video",
      type: "story"
    },
    {
      component: () => (
        <View>
          <Text
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </Text>
          <Video {...defaultVideoProps} videoId="invalid id" />
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </Text>
          <Video
            {...defaultVideoProps}
            height={374}
            videoId="invalid id"
            width={664}
          />
        </View>
      ),
      name: "with error",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <View>
          <Text
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </Text>
          <Video {...defaultVideoProps} poster={null} />
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </Text>
          <Video
            {...defaultVideoProps}
            height={374}
            poster={null}
            width={664}
          />
        </View>
      ),
      name: "no poster image",
      type: "story"
    }
  ],
  name: "Primitives/Video"
};
