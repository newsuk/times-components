import React from "react";
import { StyleSheet, View } from "react-native";
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
  halfWidthView: {
    width: "50%"
  }
});

storiesOf("Image", module)
  .add("Adjusted to parent view size", () =>
    <View>
      <Image source={exampleImage} aspectRatio={0.67} />
    </View>
  )
  .add("Resized to half of full width, keeping aspect ratio", () =>
    <View style={styles.halfWidthView}>
      <Image source={exampleImage} aspectRatio={0.67} />
    </View>
  )
  .add("Show default image on error", () =>
    <View>
      <Image source={exampleNonImage} aspectRatio={0.67} />
    </View>
  )
  .add("Apply style to image", () =>
    <View style={{ width: 100 }}>
      <Image
        style={{ borderRadius: 50 }}
        source={exampleImage}
        aspectRatio={1}
      />
    </View>
  );
