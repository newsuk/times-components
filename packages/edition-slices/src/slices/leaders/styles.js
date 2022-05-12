import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const smallBreakpointStyles = {
  container: {
    backgroundColor: colours.functional.border,
    paddingTop: spacing(4)
  },
  heading: {
    color: colours.section.comment,
    fontFamily: fonts.supporting,
    fontSize: 16,
    lineHeight: 18,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  headingContainer: {
    paddingBottom: spacing(1),
    paddingTop: spacing(2)
  },
  mastheadContainer: {
    alignItems: "center"
  },
  mastheadStyleST: {
    height: 54,
    width: 283
  },
  mastheadStyleTimes: {
    height: 51,
    width: 283
  },
  text: {
    textAlign: "center"
  }
};

const mediumBreakpointStyles = {
  container: {
    backgroundColor: colours.functional.border,
    paddingTop: spacing(6),
    marginHorizontal: spacing(6),
    marginVertical: spacing(3)
  },
  heading: {
    color: colours.section.comment,
    fontFamily: fonts.bodyRegular,
    fontSize: 15,
    lineHeight: 15
  },
  headingContainer: {
    paddingTop: spacing(2)
  },
  mastheadContainer: {
    alignItems: "center"
  },
  mastheadStyleST: {
    height: 42,
    width: 227
  },
  mastheadStyleTimes: {
    height: 42,
    width: 237
  },
  text: {
    textAlign: "center"
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    marginHorizontal: spacing(4)
  }
};

const breakPointsStyles = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => breakPointsStyles[breakpoint];
