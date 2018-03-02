import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { fonts } from "@times-components/styleguide";
import { color } from "@storybook/addon-knobs";
import { IconDiamond, IconTwitter, IconVideo } from "./icons";

const borderWidth = 1;
const borderColor = "#D3D3D3";

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
    fontFamily: fonts.supporting
  }
});

<<<<<<< HEAD
storiesOf("Primitives/Icons", module).add("Icons", () => (
  <View style={styles.wrapper}>
    <View style={styles.icon}>
      <IconDiamond width={50} height={50} fillColour="#4D4D4D" />
      <Text style={styles.label}>Diamond</Text>
=======
<<<<<<< HEAD
storiesOf("Primitives/Icons", module)
  .addDecorator(checkA11y)
  .add("Icons", () => (
    <View style={styles.wrapper}>
      <View style={styles.icon}>
        <IconDiamond width={50} height={50} fillColour="#4D4D4D" />
        <Text style={styles.label}>Diamond</Text>
      </View>
      <View style={styles.icon}>
        <IconTwitter width={50} height={50} />
        <Text style={styles.label}>Twitter</Text>
      </View>
=======
storiesOf("Primitives/Icons", module).add("Icons", () => (
  <View style={styles.wrapper}>
    <View style={styles.icon}>
      <IconDiamond
        width={50}
        height={50}
        fillColour={color("Diamond color", "#4D4D4D")}
      />
      <Text style={styles.label}>Diamond</Text>
>>>>>>> feat: adds knobs to icons
>>>>>>> feat: adds knobs to icons
    </View>
    <View style={styles.icon}>
      <IconTwitter
        width={50}
        height={50}
        fillColour={color("Icon color", "#006699")}
      />
      <Text style={styles.label}>Twitter</Text>
    </View>
    <View style={styles.icon}>
      <IconVideo
        width={50}
        height={50}
        fillColour={color("Video color", "#000000")}
      />
      <Text style={styles.label}>Video</Text>
    </View>
  </View>
));
