import React from "react";
import { StyleSheet, View } from "react-native";
import Gradient from "@times-components/gradient";
import { colours, spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    minHeight: 264,
    width: "100%"
  },
  photoContainer: {
    width: 100,
    height: 100,
    top: spacing(6),
    position: "absolute"
  },
  gradient: {
    flex: 1
  },
  roundImage: {
    width: 100,
    height: 100,
    borderColor: colours.functional.contrast,
    borderRadius: 50,
    overflow: "hidden"
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

const AuthorHeadLoading = () => (
  <View style={styles.wrapper}>
    <View style={styles.container} />
    <View style={styles.photoContainer}>
      <View style={styles.roundImage}>
        <Gradient style={styles.gradient} />
      </View>
    </View>
  </View>
);

export default AuthorHeadLoading;
