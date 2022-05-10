import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { TcScrollView } from '@times-components/utils';
import { TcText, TcView } from './components';

import timesStyleguide, { Animations, colours, fonts } from './Styleguide';
import styles from './helpers/storybookStyles';

const getStories = (colourMap: Record<string, string>) => {
  const colourBoxes = Object.keys(colourMap).map(colourName => (
    <TcView style={styles.container}>
      <TcView
        style={{ ...styles.box, backgroundColor: colourMap[colourName] }}
      />
      <TcText style={styles.text}>
        {colourName} - {colourMap[colourName]}
      </TcText>
    </TcView>
  ));

  return <TcView style={styles.display}>{colourBoxes}</TcView>;
};

const fontDisplayer = (
  fontFamily: string,
  phrase: any,
  fontSizes: Record<string, number>
) =>
  Object.keys(fontSizes).map(fontSize => (
    <Fragment key={fontSize}>
      <TcText style={styles.subHeadline}>{fontSize}</TcText>
      <TcText
        style={{
          ...styles.showoffFonts,
          fontFamily,
          fontSize: fontSizes[fontSize]
        }}
      >
        {phrase}
      </TcText>
    </Fragment>
  ));

const fontFixture = () => {
  const styleguide = timesStyleguide();
  const phrase = 'The Quick Brown Fox Jumps Over the Lazy Dog';
  return (
    <TcScrollView>
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
    </TcScrollView>
  );
};

storiesOf('Typescript Component/styleguide', module)
  .add('Fonts', () => fontFixture())
  .add('Animations', () => (
    <Animations.FadeIn>
      <TcView style={styles.animationBox}>
        <TcText style={styles.text}>Fade In</TcText>
      </TcView>
    </Animations.FadeIn>
  ))
  .add('Section Colours', () => getStories(colours.section))
  .add('Functional colours', () => getStories(colours.functional))
  .add('Secondary Section Colours', () =>
    getStories(colours.secondarySectionColours)
  );
