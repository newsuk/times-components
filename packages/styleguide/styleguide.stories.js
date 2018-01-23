import "react-native";
import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { Colours } from "./styleguide";

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    paddingRight: 10
  },
  box: {
    width: 100,
    height: 40
  }
};

const ColourSwatch = props => (
  <View style={styles.container}>
    <Text style={styles.label}>{props.label}</Text>
    <View style={[styles.box, { backgroundColor: props.colour }]} />
  </View>
);

storiesOf("Styleguide", module).add("Colours", () => (
  <ColourSwatch label="Mid Grey" colour={Colours.midGrey} />
));
