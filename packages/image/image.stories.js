import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { storiesOf } from "@storybook/react";
import Image from "./image";

const exampleImage = {
  uri:
    "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
};

const styles = StyleSheet.create({
  halfWidthView: {
    width: "50%"
  }
});

storiesOf("Image", module).add("Image", () =>
  <View style={styles.halfWidthView}>
    <Text>
      An image stretched to full width
      while maintaining its aspect ratio
    </Text>
    <Image source={exampleImage} />
  </View>
);
