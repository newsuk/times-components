import React from "react";
import { StyleSheet, Image as RNImage } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
});

export default function Image(props) {
  return <RNImage style={styles.image} {...props} />;
}
