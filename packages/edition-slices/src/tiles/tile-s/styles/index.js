import {
  fonts,
  editionBreakpoints,
  spacing,
  fontSizes,
  colours
} from "@times-components/styleguide";

const styles = {
  bold: {
    color: colours.functional.brandColour,
    fontWeight: "bold"
  },
  byline: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: 12,
    marginTop: spacing(2)
  },
  container: {
    paddingBottom: spacing(2)
  },
  paragraph: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20
  },
  title: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.smallHeadline,
    marginBottom: spacing(3)
  },
  titleWrapper: {
    alignItems: "center"
  }
};

const mediumBreakpointStyles = {
  bold: {
    color: colours.functional.brandColour,
    fontWeight: "bold"
  },
  byline: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: 12,
    marginTop: spacing(2)
  },
  container: {
    padding: spacing(3)
  },
  paragraph: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20
  },
  title: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing(2)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;
