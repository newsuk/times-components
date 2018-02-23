/* eslint-disable react/no-danger */
import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Image from "./image";

const squareUri =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400";
const sixteenNineUri =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";

const SquareImage = props => (
  <Image uri={squareUri} aspectRatio={1 / 1} {...props} />
);
const SixteenNineImage = props => (
  <Image uri={sixteenNineUri} aspectRatio={16 / 9} {...props} />
);

storiesOf("Primitives/Image", module)
  .add("Fills parent width", () => <SquareImage />)
  .add("Maintains aspect ratio", () => (
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
  ))
  .add("Maintains aspect ratio with placeholders", () => (
    <View>
      <View style={{ width: 300 }}>
        <Image uri="http://httpstat.us/404" aspectRatio={16 / 9} />
      </View>
      <View style={{ width: 200 }}>
        <Image uri="http://httpstat.us/404" aspectRatio={16 / 9} />
      </View>
      <View style={{ width: 100 }}>
        <Image uri="http://httpstat.us/404" aspectRatio={16 / 9} />
      </View>
    </View>
  ))
  .add("Can be styled and keep aspect ratio", () => (
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
        style={{ width: 50, height: 50, borderRadius: 25, overflow: "hidden" }}
      />
    </View>
  ))
  .add(
    "Handles incorrect aspect ratios inconsistently (web native mismatch)",
    () => (
      <View>
        <View style={{ width: 200, borderWidth: 1, borderColor: "black" }}>
          <Image uri={sixteenNineUri} aspectRatio={1 / 1} />
        </View>
        <View style={{ width: 200, borderWidth: 1, borderColor: "black" }}>
          <Image uri={squareUri} aspectRatio={16 / 9} />
        </View>
      </View>
    )
  )
  .add("Defaults schema to https", () => (
    <View style={{ width: 300 }}>
      <Image
        uri="//feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
        aspectRatio={1 / 1}
      />
    </View>
  ));
