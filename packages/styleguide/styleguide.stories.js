import { Platform, ScrollView, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { Animations, colours, fonts } from "./styleguide";

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
    fontFamily: fonts.body,
    fontSize: 12,
    color: "#333333"
  },
  animationBox: {
    backgroundColor: "#CCCCCC",
    margin: 50,
    padding: 100
  },
  showoffFontsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    margin: 20
  },
  showoffFonts: {
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 20
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
  .add("Functional Colours", () => {
    const colourBoxes = Object.keys(colours.functional).map(colourName => (
      <ColourBox
        key={colourName}
        name={colourName}
        hex={colours.functional[colourName]}
      />
    ));

    if (Platform.OS === "web") {
      return <View style={styles.display}>{colourBoxes}</View>;
    }
    return <ScrollView>{colourBoxes}</ScrollView>;
  })
  .add("Section Colours", () => {
    const colourBoxes = Object.keys(colours.section).map(colourName => (
      <ColourBox
        key={colourName}
        name={colourName}
        hex={colours.section[colourName]}
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
  ))

  .add("Fonts", () => {
    const phrase = "The Quick Brown Fox Jumped Over the Lazy Dog";
    return (
      <ScrollView>
        <View style={styles.showoffFontsContainer}>
          <Text>Body</Text>
          <Text style={[styles.showoffFonts, { fontFamily: fonts.body }]}>
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text>Body Regular</Text>
          <Text
            style={[styles.showoffFonts, { fontFamily: fonts.bodyRegular }]}
          >
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text>Body Regular Small Caps</Text>
          <Text
            style={[
              styles.showoffFonts,
              { fontFamily: fonts.bodyRegularSmallCaps }
            ]}
          >
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text>Headline</Text>
          <Text style={[styles.showoffFonts, { fontFamily: fonts.headline }]}>
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text>Headline Regular</Text>
          <Text
            style={[styles.showoffFonts, { fontFamily: fonts.headlineRegular }]}
          >
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text>Supporting</Text>
          <Text style={[styles.showoffFonts, { fontFamily: fonts.supporting }]}>
            {phrase}
          </Text>
        </View>
      </ScrollView>
    );
  });
