import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@times-components/styleguide";
import Bio from "./author-bio.base";

const styles = StyleSheet.create({
  bio: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: 32
  }
});

export default props => (
  <View style={styles.bio}>
    <Bio {...props} />
  </View>
);
