import "react-native";
import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { Colours } from "./styleguide";

const styles = {
  container: {
    flexDirection: "column",
    alignItems: "center",

  },
  colourBox: {
    flexDirection: "row",
  },
  label: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  box: {
    width: 100,
    height: 80,
    margin: 25,
    padding: 5,
    borderRadius: 5
  }
};



const ColourSwatch = props => (
  <View style={styles.container}>
    <View style={[styles.box, { backgroundColor: props.colour }]} />
    <Text style={styles.label}>{props.label}</Text>
    <Text style={styles.label}>{props.colour}</Text>
  </View>
);

storiesOf("Styleguide", module)
  .add("Base Colours", () => (
    <View style={styles.colourBox}>{
      Object.entries(Colours).map( ([label, colour]) =>
        <ColourSwatch label={label} colour={colour} />
      )
    }</View>
  ));
