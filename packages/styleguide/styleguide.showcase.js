import { ScrollView, Text, View } from "react-native";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import timesStyleguide, {
  Animations,
  colours,
  fonts,
  scales
} from "./src/styleguide";
import styles from "./styleguide.styles";

const ColourBox = ({ name, hex }) => (
  <View style={styles.container}>
    <View style={{ ...styles.box, backgroundColor: hex }} />
    <Text style={styles.text}>
      {name} - {hex}
    </Text>
  </View>
);

ColourBox.propTypes = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const fontDisplayer = (fontFamily, phrase, fontSizes) =>
  Object.keys(fontSizes).map(fontSize => (
    <Fragment key={fontSize}>
      <Text style={styles.subHeadline}>{fontSize}</Text>
      <Text
        style={[
          styles.showoffFonts,
          { fontFamily, fontSize: fontSizes[fontSize] }
        ]}
      >
        {phrase}
      </Text>
    </Fragment>
  ));

const fontFixture = select => {
  const scale = select("Scale", scales, scales.large);
  const styleguide = timesStyleguide({ scale });
  const phrase = "The Quick Brown Fox Jumped Over the Lazy Dog";
  return (
    <ScrollView>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Body</Text>
        {fontDisplayer(fonts.body, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Body Regular</Text>
        <Text>
          Used for the body copy of articles or as the teaser copy on article
          links.
        </Text>
        {fontDisplayer(fonts.bodyRegular, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Body Regular Small Caps</Text>
        <Text>
          Always used as a lowercase font, it is typically used to support the
          headline font. It’s used in various different places e.g. Journalist
          pages for the Journalist job title, article flags and show more
          buttons on the homepage.
        </Text>
        {fontDisplayer(
          fonts.bodyRegularSmallCaps,
          phrase.toLowerCase(),
          styleguide.fontSizes
        )}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Headline</Text>
        <Text>
          Used as the headline for components and articles across the site.
        </Text>
        {fontDisplayer(fonts.headline, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Headline Regular</Text>
        <Text>
          Used primarily to style subheadings for components and stand firsts on
          the homepage and articles.
        </Text>
        {fontDisplayer(fonts.headlineRegular, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Supporting</Text>
        <Text>
          Used as a supporting typeface in a variety of places including
          messaging banners, buttons, links, homepage labels and tags.
        </Text>
        {fontDisplayer(fonts.supporting, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>
          Style Magazine (Century Gothic Bold)
        </Text>
        <Text>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Style magazine
        </Text>
        {fontDisplayer(fonts.styleMagazine, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>Culture Magazine (Flama Bold)</Text>
        <Text>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Culture magazine
        </Text>
        {fontDisplayer(fonts.cultureMagazine, phrase, styleguide.fontSizes)}
      </View>
      <View style={styles.showoffFontsContainer}>
        <Text style={styles.headline}>
          Sunday Times Magazine (Tiempos Headline Bold)
        </Text>
        <Text>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Sunday Times Magazine
        </Text>
        {fontDisplayer(fonts.stMagazine, phrase, styleguide.fontSizes)}
      </View>
    </ScrollView>
  );
};

export default {
  children: [
    {
      component: () => {
        const colourBoxes = Object.keys(colours.functional).map(colourName => (
          <ColourBox
            hex={colours.functional[colourName]}
            key={colourName}
            name={colourName}
          />
        ));

        return <ScrollView>{colourBoxes}</ScrollView>;
      },
      name: "Functional Colours",
      platform: "native",
      type: "story"
    },
    {
      component: () => {
        const colourBoxes = Object.keys(colours.functional).map(colourName => (
          <ColourBox
            hex={colours.functional[colourName]}
            key={colourName}
            name={colourName}
          />
        ));

        return <View style={styles.display}>{colourBoxes}</View>;
      },
      name: "Functional Colours",
      platform: "web",
      type: "story"
    },
    {
      component: () => {
        const colourBoxes = Object.keys(colours.secondarySectionColours).map(
          colourName => (
            <ColourBox
              hex={colours.secondarySectionColours[colourName]}
              key={colourName}
              name={colourName}
            />
          )
        );

        return <ScrollView>{colourBoxes}</ScrollView>;
      },
      name: "Secondary Section Colours",
      platform: "native",
      type: "story"
    },
    {
      component: () => {
        const colourBoxes = Object.keys(colours.secondarySectionColours).map(
          colourName => (
            <ColourBox
              hex={colours.secondarySectionColours[colourName]}
              key={colourName}
              name={colourName}
            />
          )
        );

        return <View style={styles.display}>{colourBoxes}</View>;
      },
      name: "Secondary Section Colours",
      platform: "web",
      type: "story"
    },
    {
      component: () => {
        const colourBoxes = Object.keys(colours.section).map(colourName => (
          <ColourBox
            hex={colours.section[colourName]}
            key={colourName}
            name={colourName}
          />
        ));

        return <ScrollView>{colourBoxes}</ScrollView>;
      },
      name: "Section Colours",
      platform: "native",
      type: "story"
    },
    {
      component: () => {
        const colourBoxes = Object.keys(colours.section).map(colourName => (
          <ColourBox
            hex={colours.section[colourName]}
            key={colourName}
            name={colourName}
          />
        ));

        return <View style={styles.display}>{colourBoxes}</View>;
      },
      name: "Section Colours",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <Animations.FadeIn>
          <View style={styles.animationBox}>
            <Text style={styles.text}>Fade In</Text>
          </View>
        </Animations.FadeIn>
      ),
      name: "Animations",
      type: "story"
    },
    {
      component({ select }) {
        return fontFixture(select);
      },
      name: "Fonts",
      type: "story"
    }
  ],
  name: "Helpers/Styleguide"
};
