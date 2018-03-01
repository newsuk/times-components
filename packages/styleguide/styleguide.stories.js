import { Platform, ScrollView, Text, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import styles from "./styleguide.stories.styles";
import { Animations, colours, fonts } from "./styleguide";

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
  .addDecorator(checkA11y)
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
          <Text style={styles.headline}>Body</Text>
          <Text style={[styles.showoffFonts, { fontFamily: fonts.body }]}>
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text style={styles.headline}>Body Regular</Text>
          <Text>
            Used for the body copy of articles or as the teaser copy on article
            links.
          </Text>
          <Text
            style={[styles.showoffFonts, { fontFamily: fonts.bodyRegular }]}
          >
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text style={styles.headline}>Body Regular Small Caps</Text>
          <Text>
            Always used as a lowercase font, it is typically used to support the
            headline font. It’s used in various different places e.g. Journalist
            pages for the Journalist job title, article flags and show more
            buttons on the homepage.
          </Text>
          <Text
            style={[
              styles.showoffFonts,
              { fontFamily: fonts.bodyRegularSmallCaps }
            ]}
          >
            {phrase.toLowerCase()}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text style={styles.headline}>Headline</Text>
          <Text>
            Used as the headline for components and articles across the site.
          </Text>
          <Text style={[styles.showoffFonts, { fontFamily: fonts.headline }]}>
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text style={styles.headline}>Headline Regular</Text>
          <Text>
            Used primarily to style subheadings for components and stand firsts
            on the homepage and articles.
          </Text>
          <Text
            style={[styles.showoffFonts, { fontFamily: fonts.headlineRegular }]}
          >
            {phrase}
          </Text>
        </View>
        <View style={styles.showoffFontsContainer}>
          <Text style={styles.headline}>Supporting</Text>
          <Text>
            Used as a supporting typeface in a variety of places including
            messaging banners, buttons, links, homepage labels and tags.
          </Text>
          <Text style={[styles.showoffFonts, { fontFamily: fonts.supporting }]}>
            {phrase}
          </Text>
        </View>
      </ScrollView>
    );
  });
