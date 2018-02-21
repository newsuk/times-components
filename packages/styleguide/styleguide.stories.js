import { Platform, ScrollView, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { colours, Animations } from "./styleguide";

const styles = {
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
  },
  animationBox: {
    backgroundColor: "#CCCCCC",
    margin: 50,
    padding: 100
  }
};

const ColourBox = ({ name, hex }) => (
  <View style={styles.container}>
    <View style={{ ...styles.box, backgroundColor: hex }} />
    <Text style={styles.text}>
      {name} - {hex}
    </Text>
  </View>
);

ColourBox.propTypes = {
  name: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired
};

storiesOf("Helpers/Styleguide", module)
  .add("Section Colours", () => {
    const colourBoxes = Object.keys(colours.sectionColours).map(colourName => (
      <ColourBox
        key={colourName}
        name={colourName}
        hex={colours.sectionColours[colourName]}
      />
    ));

    if (Platform.OS === "web") {
      return <View style={styles.display}>{colourBoxes}</View>;
    }
    return <ScrollView>{colourBoxes}</ScrollView>;
  })

  .add("Animations", () => (
    <Animations.FadeIn>
      <View style={styles.animationBox}>
        <Text style={styles.text}>Fade In</Text>
      </View>
    </Animations.FadeIn>
  ));
