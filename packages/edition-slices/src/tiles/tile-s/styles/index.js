import {
  fonts,
  editionBreakpoints,
  spacing,
  fontSizes,
  colours
} from "@times-components/styleguide";

const smallBreakpointStyles = {
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
    fontSize: fontSizes.smallHeadline
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
    ...smallBreakpointStyles.title,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: spacing(1)
  },
  titleWithoutMargin: {
    ...smallBreakpointStyles.title,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing(1)
  }
};

const wideBreakpointStyle = {
  ...mediumBreakpointStyles,
  title: {
    ...mediumBreakpointStyles.title,
    marginBottom: 0
  },
  titleWrapper: {
    ...mediumBreakpointStyles.titleWrapper,
    marginBottom: spacing(2)
  }
};

const styleResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyle,
  [editionBreakpoints.huge]: wideBreakpointStyle
};

export default breakpoint => styleResolver[breakpoint];
