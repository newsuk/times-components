import React from "react";
import { StyleSheet, Text } from "react-native";
import Bio from "./author-bio.base";

const styles = StyleSheet.create({
  bio: { maxWidth: "88%", paddingBottom: 32 }
});

export default props => (
  <Text style={styles.bio}>
    <Bio {...props} />
  </Text>
);
