import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import {
  IconDiamond,
  IconTwitter,
  IconChevronLeft,
  IconChevronRight
} from "./icons";

const borderWidth = 1;
const borderColor = "#d3d3d3";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 20,
    borderLeftWidth: borderWidth,
    borderLeftColor: borderColor,
    borderTopWidth: borderWidth,
    borderTopColor: borderColor
  },
  icon: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: borderWidth,
    borderRightColor: borderColor,
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor
  },
  label: {
    paddingTop: 15,
    fontFamily: "GillSansMTStd-Medium"
  }
});

storiesOf("Icons", module).add("Icons", () => (
  <View style={styles.wrapper}>
    <View style={styles.icon}>
      <IconDiamond width={50} height={50} fillColour="#4D4D4D" />
      <Text style={styles.label}>Diamond</Text>
    </View>
    <View style={styles.icon}>
      <IconTwitter width={50} height={50} />
      <Text style={styles.label}>Twitter</Text>
    </View>
    <View style={styles.icon}>
      <IconChevronLeft width={50} height={50} fillColour="#4D4D4D" />
      <Text style={styles.label}>Chevron (Left)</Text>
    </View>
    <View style={styles.icon}>
      <IconChevronRight width={50} height={50} fillColour="#4D4D4D" />
      <Text style={styles.label}>Chevron (Right)</Text>
    </View>
  </View>
));
