/* eslint-disable react/no-danger */
import React from "react";
import { View } from "react-native";
import Image from "./src/image";

const squareUri =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400";
const sixteenNineUri =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";

const SquareImage = props => (
  <Image aspectRatio={1 / 1} uri={squareUri} {...props} />
);
const SixteenNineImage = props => (
  <Image aspectRatio={16 / 9} uri={sixteenNineUri} {...props} />
);

export default {
  name: "Primitives/Image",
  children: [
    {
      type: "story",
      name: "Fills parent width",
      component: () => <SquareImage />
    },
    {
      type: "story",
      name: "Maintains aspect ratio",
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
      )
    },
    {
      type: "story",
      name: "Maintains aspect ratio with placeholders",
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
      )
    },
    {
      type: "story",
      name: "Can be styled and keep aspect ratio",
      component: () => (
        <View>
          <SquareImage
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              overflow: "hidden"
            }}
          />
          <SquareImage
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              overflow: "hidden"
            }}
          />
          <SquareImage
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: "hidden"
            }}
          />
        </View>
      )
    },
    {
      type: "story",
      name:
        "Handles incorrect aspect ratios inconsistently (web native mismatch)",
      component: () => (
        <View>
          <View style={{ width: 200, borderWidth: 1, borderColor: "black" }}>
            <Image aspectRatio={1 / 1} uri={sixteenNineUri} />
          </View>
          <View style={{ width: 200, borderWidth: 1, borderColor: "black" }}>
            <Image aspectRatio={16 / 9} uri={squareUri} />
          </View>
        </View>
      )
    },
    {
      type: "story",
      name: "Defaults schema to https",
      component: () => (
        <View style={{ width: 300 }}>
          <Image
            aspectRatio={1 / 1}
            uri="//feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
          />
        </View>
      )
    }
  ]
};
