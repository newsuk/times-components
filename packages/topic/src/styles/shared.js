import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyle = {
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: spacing(3),
    paddingBottom: spacing(8),
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    backgroundColor: colours.functional.backgroundPrimary
  },
  name: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.pageHeadline,
    color: colours.functional.brandColour,
    paddingBottom: spacing(4)
  },
  description: {
    fontFamily: fonts.body,
    textAlign: "center",
    fontSize: fontSizes.tertiary,
    lineHeight: 26,
    color: colours.functional.primary
  }
};

export default sharedStyle;
