import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Image from "./image";

const exampleImage = {
  uri:
    "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
};

const styles = StyleSheet.create({
  halfWidthView: {
    width: "100%"
  },
  customSize: {
    width: "100px"
  }
});

storiesOf("Image", module)
.add("Stretched to full width keeping aspect ratio", () =>
  <View style={styles.halfWidthView}>
    <Image source={exampleImage} />
  </View>
).add("With custom width of 100px", () =>
  <View style={styles.customSize}>
    <Image source={exampleImage} />
  </View>
);
