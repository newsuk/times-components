import "react-native";
import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { UIColours, WeekdaysColours, WeekendColours, Fonts } from "./styleguide";

const styles = {
  colorContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

  colourBox: {
    flexWrap: "wrap",
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
  },

  fontContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20
  },

  text: {
    borderColor: 'black',
    width: 250,
    fontSize:20
  }
};

const FontSwatch = props => (
  <View style={{
    ...styles.fontContainer
  }}>
    <Text style={{
      ...styles.text,
     fontFamily: props.font
    }}> Lorem ipsum dolor sit amet </Text>
    <Text style={styles.label}>{props.label}</Text>
    <Text style={styles.label}>{props.font}</Text>
  </View>
);


const ColourSwatch = props => (
  <View style={styles.colorContainer}>
    <View style={[styles.box, { backgroundColor: props.colour }]} />
    <Text style={styles.label}>{props.label}</Text>
    <Text style={styles.label}>{props.colour}</Text>
  </View>
);

storiesOf("Styleguide", module)
  .add("UI Colours", () => (
    <View style={styles.colourBox}>{
      Object.entries(UIColours).map( ([label, colour]) =>
        <ColourSwatch label={label} colour={colour} />
      )
    }</View>
  ))
  .add("Weekdays Colours", () => (
    <View style={styles.colourBox}>{
      Object.entries(WeekdaysColours).map( ([label, colour]) =>
        <ColourSwatch label={label} colour={colour} key={colour} />
      )
    }</View>
  ))
  .add("Weekend Colours", () => (
    <View style={styles.colourBox}>{
      Object.entries(WeekendColours).map( ([label, colour]) =>
        <ColourSwatch label={label} colour={colour} key={colour} />
      )
    }</View>
  ))
  .add("Fonts", () => (
    <View style={styles.fontBox}>{ 
      Object.entries(Fonts).map( ([label, font]) =>
        <FontSwatch label={label} font={font} key={font} />
      )
    }</View>
  ))
