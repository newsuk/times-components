import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyles = {
  leadAsset: {
    marginBottom: 2 * spacing
  },
  articleTextElement: {
    fontFamily: fonts.body,
    lineHeight: 26,
    fontSize: fontSizes.bodyMobile,
    marginBottom: 5 * spacing,
    color: colours.functional.primary
  },
  articleMainContentRow: {
    paddingLeft: 2 * spacing,
    paddingRight: 2 * spacing
  }
};

export default sharedStyles;
