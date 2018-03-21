import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyles = {
  leadAsset: {
    marginBottom: spacing(2)
  },
  articleTextElement: {
    fontFamily: fonts.body,
    lineHeight: 26,
    fontSize: fontSizes.bodyMobile,
    marginBottom: spacing(5),
    color: colours.functional.primary
  },
  articleMainContentRow: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  }
};

export default sharedStyles;
