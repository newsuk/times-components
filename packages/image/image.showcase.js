/* eslint-disable react/no-danger */
import React from "react";
import { View } from "react-native";
import Image from "./src/image";

const squareUri =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400";
const sixteenNineUri =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";

const SquareImage = props => (
  <Image aspectRatio={1} uri={squareUri} {...props} />
);
const SixteenNineImage = props => (
  <Image aspectRatio={16 / 9} uri={sixteenNineUri} {...props} />
);

export default {
  children: [
    {
      component: () => <SquareImage />,
      name: "Fills parent width",
      type: "story"
    },
    {
      component: () => <SquareImage rounded />,
      name: "Rounded images",
      type: "story"
    },
    {
      component: () => (
        <View>
          <View style={{ width: 300 }}>
            <SixteenNineImage />
          </View>
          <View style={{ width: 200 }}>
            <SixteenNineImage />
          </View>
          <View style={{ width: 100 }}>
            <SixteenNineImage />
          </View>
        </View>
      ),
      name: "Maintains aspect ratio",
      type: "story"
    },
    {
      component: () => (
        <View>
          <View style={{ width: 300 }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </View>
          <View style={{ width: 200 }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </View>
          <View style={{ width: 100 }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </View>
        </View>
      ),
      name: "Maintains aspect ratio with placeholders",
      type: "story"
    },
    {
      component: () => (
        <View>
          <View style={{ width: 300 }}>
            <Image aspectRatio={16 / 9} uri={null} />
          </View>
        </View>
      ),
      name: "Falls back to display the placeholder",
      type: "story"
    },
    {
      component: () => (
        <View>
          <SquareImage
            style={{
              borderRadius: 100,
              height: 200,
              overflow: "hidden",
              width: 200
            }}
          />
          <SquareImage
            style={{
              borderRadius: 50,
              height: 100,
              overflow: "hidden",
              width: 100
            }}
          />
          <SquareImage
            style={{
              borderRadius: 25,
              height: 50,
              overflow: "hidden",
              width: 50
            }}
          />
        </View>
      ),
      name: "Can be styled and keep aspect ratio",
      type: "story"
    },
    {
      component: () => (
        <View>
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: 200
            }}
          >
            <Image aspectRatio={1 / 1} uri={sixteenNineUri} />
          </View>
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: 200
            }}
          >
            <Image aspectRatio={16 / 9} uri={squareUri} />
          </View>
        </View>
      ),
      name:
        "Handles incorrect aspect ratios inconsistently (web native mismatch)",
      type: "story"
    },
    {
      component: () => (
        <View style={{ width: 300 }}>
          <Image
            aspectRatio={1 / 1}
            uri="//feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
          />
        </View>
      ),
      name: "Defaults schema to https",
      type: "story"
    }
  ],
  name: "Primitives/Image"
};
