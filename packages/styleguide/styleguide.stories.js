import { Platform, ScrollView, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import sectionColours from "./styleguide";

const colourBoxStyles = {
  display: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
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

ColourBox.propTypes = {
  name: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired
};

storiesOf("Styleguide", module).add("Section Colours", () => {
  const colourBoxes = Object.keys(sectionColours).map(colourName => (
    <ColourBox
      key={colourName}
      name={colourName}
      hex={sectionColours[colourName]}
    />
  ));

  if (Platform.OS === "web") {
    return <View style={colourBoxStyles.display}>{colourBoxes}</View>;
  }
  return <ScrollView>{colourBoxes}</ScrollView>;
});
