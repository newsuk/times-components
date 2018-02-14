import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import sectionColours from "./styleguide";

const colourBoxStyles = {
  container: {
    width: 250,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    margin: 20
  },
  box: {
    height: 100,
    marginBottom: 10
  },
  text: {
    textAlign: "center",
    fontFamily: "TimesDigitalW04",
    fontSize: 12,
    color: "#333333"
  }
};

const ColourBox = ({ name, hex }) => (
  <View style={colourBoxStyles.container}>
    <View style={{ ...colourBoxStyles.box, backgroundColor: hex }} />
    <Text style={colourBoxStyles.text}>
      {name} - {hex}
    </Text>
  </View>
);

storiesOf("Styleguide", module).add("Section Colours", () => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    {Object.keys(sectionColours).map(colour => (
      <ColourBox name={colour} hex={sectionColours[colour]} />
    ))}
  </View>
));
