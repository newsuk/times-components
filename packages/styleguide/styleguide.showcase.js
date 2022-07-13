import { TcText, TcView } from "@times-components/utils";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import timesStyleguide, {
  Animations,
  colours,
  fonts,
  scales
} from "./src/styleguide";
import styles from "./styleguide.styles";

const getStories = ({ colourMap, name }) => {
  const story = {
    component: () => {
      const colourBoxes = Object.keys(colourMap).map(colourName => (
        <ColourBox
          hex={colourMap[colourName]}
          key={colourName}
          name={colourName}
        />
      ));

      return <TcView style={styles.display}>{colourBoxes}</TcView>;
    },
    name,
    type: "story"
  };

  return [{ ...story, platform: "web" }];
};

const getBuilder = () => {
  const bulder = {
    add: ({ colourMap, name }) => {
      bulder.stories.push(...getStories({ colourMap, name }));
      return bulder;
    },
    stories: []
  };

  return bulder;
};

const ColourBox = ({ name, hex }) => (
  <TcView style={styles.container}>
    <TcView style={{ ...styles.box, backgroundColor: hex }} />
    <TcText style={styles.text}>
      {name} - {hex}
    </TcText>
  </TcView>
);

ColourBox.propTypes = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const fontDisplayer = (fontFamily, phrase, fontSizes) =>
  Object.keys(fontSizes).map(fontSize => (
    <Fragment key={fontSize}>
      <TcText style={styles.subHeadline}>{fontSize}</TcText>
      <TcText
        style={[
          styles.showoffFonts,
          { fontFamily, fontSize: fontSizes[fontSize] }
        ]}
      >
        {phrase}
      </TcText>
    </Fragment>
  ));

const fontFixture = select => {
  const scale = select("Scale", scales, scales.large);
  const styleguide = timesStyleguide({ scale });
  const phrase = "The Quick Brown Fox Jumps Over the Lazy Dog";
  return (
    <TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Body</TcText>
        {fontDisplayer(fonts.body, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Body Regular</TcText>
        <TcText>
          Used for the body copy of articles or as the teaser copy on article
          links.
        </TcText>
        {fontDisplayer(fonts.bodyRegular, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Body Regular Small Caps</TcText>
        <TcText>
          Always used as a lowercase font, it is typically used to support the
          headline font. It’s used in various different places e.g. Journalist
          pages for the Journalist job title, article flags and show more
          buttons on the homepage.
        </TcText>
        {fontDisplayer(
          fonts.bodyRegularSmallCaps,
          phrase.toLowerCase(),
          styleguide.fontSizes
        )}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Headline</TcText>
        <TcText>
          Used as the headline for components and articles across the site.
        </TcText>
        {fontDisplayer(fonts.headline, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Headline Regular</TcText>
        <TcText>
          Used primarily to style subheadings for components and stand firsts on
          the homepage and articles.
        </TcText>
        {fontDisplayer(fonts.headlineRegular, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Supporting</TcText>
        <TcText>
          Used as a supporting typeface in a variety of places including
          messaging banners, buttons, links, homepage labels and tags.
        </TcText>
        {fontDisplayer(fonts.supporting, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>
          Style Magazine (Century Gothic Bold)
        </TcText>
        <TcText>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Style magazine
        </TcText>
        {fontDisplayer(fonts.styleMagazine, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>Culture Magazine (Flama Bold)</TcText>
        <TcText>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Culture magazine
        </TcText>
        {fontDisplayer(fonts.cultureMagazine, phrase, styleguide.fontSizes)}
      </TcView>
      <TcView style={styles.showoffFontsContainer}>
        <TcText style={styles.headline}>
          Sunday Times Magazine (Tiempos Headline Bold)
        </TcText>
        <TcText>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Sunday Times Magazine
        </TcText>
        {fontDisplayer(fonts.stMagazine, phrase, styleguide.fontSizes)}
      </TcView>
    </TcView>
  );
};

const colourStoriesBuilder = getBuilder();
colourStoriesBuilder
  .add({ colourMap: colours.functional, name: "Functional Colours" })
  .add({
    colourMap: colours.secondarySectionColours,
    name: "Secondary Section Colours"
  })
  .add({ colourMap: colours.section, name: "Section Colours" });

export default {
  children: [
    ...colourStoriesBuilder.stories,
    {
      component: () => (
        <Animations.FadeIn>
          <TcView style={styles.animationBox}>
            <TcText style={styles.text}>Fade In</TcText>
          </TcView>
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
