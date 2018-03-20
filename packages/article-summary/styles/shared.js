import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyles = {
  text: {
    color: colours.functional.secondary,
    fontSize: fontSizes.teaser,
    fontFamily: fonts.body,
    lineHeight: 20,
    marginBottom: 2 * spacing,
    flexWrap: "wrap"
  },
  metaText: {
    color: colours.functional.secondary,
    fontSize: fontSizes.cardMeta,
    lineHeight: 15,
    fontFamily: fonts.supporting,
    marginBottom: spacing
  },
  labelWrapper: {
    marginBottom: 0
  },
  headline: {
    color: colours.functional.primary,
    marginBottom: spacing,
    fontFamily: fonts.headline,
    fontWeight: "400"
  },
  headlineWrapper: {
    fontSize: fontSizes.smallHeadline,
    lineHeight: 22
  }
};

export default sharedStyles;
