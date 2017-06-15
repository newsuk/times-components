import React from "react";
import { StyleSheet, Image as RNImage } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "stretch"
  }
});

export default function Image(props) {
  return <RNImage style={styles.image} {...props} />;
}
