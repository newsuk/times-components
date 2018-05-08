import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyle = {
  wrapper: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: spacing(6),
    paddingBottom: spacing(8),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
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
    color: colours.functional.primary,
    paddingTop: spacing(4)
  },
  divider: {
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    width: 199,
    justifyContent: "center"
  },
  container: {
    alignItems: "center"
  }
};

export default sharedStyle;
