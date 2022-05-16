import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { TcScrollView } from '@times-components/utils';
import { TsTcText, TsTcView } from './components';

import timesStyleguide, { Animations, colours, fonts } from './Styleguide';
import styles from './helpers/storybookStyles';

const getStories = (colourMap: Record<string, string>) => {
  const colourBoxes = Object.keys(colourMap).map(colourName => (
    <TsTcView style={styles.container}>
      <TsTcView
        style={{ ...styles.box, backgroundColor: colourMap[colourName] }}
      />
      <TsTcText style={styles.text}>
        {colourName} - {colourMap[colourName]}
      </TsTcText>
    </TsTcView>
  ));

  return <TsTcView style={styles.display}>{colourBoxes}</TsTcView>;
};

const fontDisplayer = (
  fontFamily: string,
  phrase: any,
  fontSizes: Record<string, number>
) =>
  Object.keys(fontSizes).map(fontSize => (
    <Fragment key={fontSize}>
      <TsTcText style={styles.subHeadline}>{fontSize}</TsTcText>
      <TsTcText
        style={{
          ...styles.showoffFonts,
          fontFamily,
          fontSize: fontSizes[fontSize]
        }}
      >
        {phrase}
      </TsTcText>
    </Fragment>
  ));

const fontFixture = () => {
  const styleguide = timesStyleguide();
  const phrase = 'The Quick Brown Fox Jumps Over the Lazy Dog';
  return (
    <TcScrollView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>Body</TsTcText>
        {fontDisplayer(fonts.body, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>Body Regular</TsTcText>
        <TsTcText>
          Used for the body copy of articles or as the teaser copy on article
          links.
        </TsTcText>
        {fontDisplayer(fonts.bodyRegular, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>Body Regular Small Caps</TsTcText>
        <TsTcText>
          Always used as a lowercase font, it is typically used to support the
          headline font. It’s used in various different places e.g. Journalist
          pages for the Journalist job title, article flags and show more
          buttons on the homepage.
        </TsTcText>
        {fontDisplayer(
          fonts.bodyRegularSmallCaps,
          phrase.toLowerCase(),
          styleguide.fontSizes
        )}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>Headline</TsTcText>
        <TsTcText>
          Used as the headline for components and articles across the site.
        </TsTcText>
        {fontDisplayer(fonts.headline, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>Headline Regular</TsTcText>
        <TsTcText>
          Used primarily to style subheadings for components and stand firsts on
          the homepage and articles.
        </TsTcText>
        {fontDisplayer(fonts.headlineRegular, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>Supporting</TsTcText>
        <TsTcText>
          Used as a supporting typeface in a variety of places including
          messaging banners, buttons, links, homepage labels and tags.
        </TsTcText>
        {fontDisplayer(fonts.supporting, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>
          Style Magazine (Century Gothic Bold)
        </TsTcText>
        <TsTcText>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Style magazine
        </TsTcText>
        {fontDisplayer(fonts.styleMagazine, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>
          Culture Magazine (Flama Bold)
        </TsTcText>
        <TsTcText>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Culture magazine
        </TsTcText>
        {fontDisplayer(fonts.cultureMagazine, phrase, styleguide.fontSizes)}
      </TsTcView>
      <TsTcView style={styles.showoffFontsContainer}>
        <TsTcText style={styles.headline}>
          Sunday Times Magazine (Tiempos Headline Bold)
        </TsTcText>
        <TsTcText>
          Used for theme specific headlines, drop caps and pull-quotes in the
          Sunday Times Magazine
        </TsTcText>
        {fontDisplayer(fonts.stMagazine, phrase, styleguide.fontSizes)}
      </TsTcView>
    </TcScrollView>
  );
};

storiesOf('Typescript Component/styleguide', module)
  .add('Fonts', () => fontFixture())
  .add('Animations', () => (
    <Animations.FadeIn>
      <TsTcView style={styles.animationBox}>
        <TsTcText style={styles.text}>Fade In</TsTcText>
      </TsTcView>
    </Animations.FadeIn>
  ))
  .add('Section Colours', () => getStories(colours.section))
  .add('Functional colours', () => getStories(colours.functional))
  .add('Secondary Section Colours', () =>
    getStories(colours.secondarySectionColours)
  );
