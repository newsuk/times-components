import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyles = {
  articleHeadLineText: {
    fontSize: fontSizes.headline,
    lineHeight: 32,
    color: colours.functional.brandColour,
    marginBottom: 7,
    fontFamily: fonts.headline
  },
  standFirst: {
    fontSize: fontSizes.smallestHeadline,
    lineHeight: 26,
    fontFamily: fonts.headlineRegular,
    color: colours.functional.primary,
    paddingBottom: 9
  },
  articleLabel: {
    paddingTop: 4,
    paddingBottom: spacing(1)
  },
  articleFlag: {
    marginBottom: 11,
    flexDirection: "row"
  },
  articleFlagContainer: {
    marginRight: 14
  }
};

export default sharedStyles;
