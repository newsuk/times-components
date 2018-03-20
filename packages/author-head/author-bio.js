import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@times-components/styleguide";
import Bio from "./author-bio.base";

const styles = StyleSheet.create({
  bio: {
    paddingLeft: 2 * spacing,
    paddingRight: 2 * spacing,
    paddingBottom: 32
  }
});

export default props => (
  <View style={styles.bio}>
    <Bio {...props} />
  </View>
);
