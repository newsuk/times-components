/* eslint-disable react/prop-types */
import { View, Text, Alert } from "react-native";
import React from "react";
import Video from "./src/video";

const id = "3dbfe6b8-680b-11e9-b277-88f3d445182c";
const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "5436121857001";
const videoId = "5831024132001";
const posterImageURI =
  "https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";

const defaultVideoProps = {
  accountId,
  height: 180,
  id,
  is360: false,
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

const mockId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

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
        const props = {
          playerId: "y4yoiFCf1",
          videoId: "5992442066001",
          is360: true
        };
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
            <Video
              {...defaultVideoProps}
              {...props}
              height={374}
              width={664}
              id={mockId}
            />
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
          <Video {...defaultVideoProps} videoId="5612887446001" id={mockId} />
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
