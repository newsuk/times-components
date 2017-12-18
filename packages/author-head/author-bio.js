import React from "react";
import { StyleSheet, View } from "react-native";
import Bio from "./author-bio.base";

const styles = StyleSheet.create({
  bio: { paddingLeft: 10, paddingRight: 10, paddingBottom: 32 }
});

export default props => (
  <View style={styles.bio}>
    <Bio {...props} />
  </View>
);
