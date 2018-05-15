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
    paddingTop: spacing(7),
    paddingHorizontal: spacing(2),
    backgroundColor: colours.functional.backgroundPrimary,
    minHeight: 90
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
    paddingVertical: spacing(4)
  },
  divider: {
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    width: 200,
    justifyContent: "center"
  },
  container: {
    alignItems: "center"
  },
  paddingBottom: {
    paddingBottom: spacing(4)
  }
};

export default sharedStyle;
