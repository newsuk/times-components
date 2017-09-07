import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import Image from "./image";

const exampleImage = {
  uri:
    "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
};

const exampleNonImage = {
  uri: "http://httpstat.us/404"
};

const styles = StyleSheet.create({
  container: {
    height: 256
  },
  halfWidthView: {
    width: "50%"
  }
});

storiesOf("Image", module)
  .add("Adjusted to parent view size", () => (
    <View style={[styles.container]}>
      <Image style={{ resizeMode: "center" }} source={exampleImage} />
    </View>
  ))
  .add("Resized to half of full width, keeping aspect ratio", () => (
    <View style={[styles.container, styles.halfWidthView]}>
      <Image source={exampleImage} />
    </View>
  ))
  .add("Show default image on error", () => (
    <View style={styles.container}>
      <Image source={exampleNonImage} />
    </View>
  ))
  .add("Show default image on error centered", () => (
    <View>
      <Image style={{ resizeMode: "center" }} source={exampleNonImage} />
    </View>
  ))
  .add("No schema url", () => (
    <View style={{ width: 100, height: 100 }}>
      <Image
        resizeMode={"cover"}
        source={{
          uri:
            "//www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
        }}
      />
    </View>
  ))
  .add("Apply style to image", () => (
    <View style={{ width: 100, height: 100 }}>
      <Image
        resizeMode={"cover"}
        style={{ borderRadius: 50, width: 100, height: 100 }}
        source={exampleImage}
      />
    </View>
  ));
