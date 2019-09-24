import {
  colours,
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.small]: 18,
  [editionBreakpoints.medium]: 18,
  [editionBreakpoints.wide]: 28,
  [editionBreakpoints.huge]: 45
};

const smallBreakpointStyles = breakpoint => ({
  container: {
    backgroundColor: colours.functional.darkSupplement,
    flexDirection: "row",
    padding: spacing(2),
    marginLeft: spacing(1)
  },
  flagColour: {
    color: colours.functional.greyLabel
  },
  headline: {
    ...fontFactory({
      font: "headline"
    }),
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    color: colours.functional.white
  },
  imageContainer: {
    width: "50%"
  },
  summary: {
    color: colours.functional.greyLabel
  },
  strapline: {
    fontSize: 14
  },
  summaryContainer: {
    paddingLeft: spacing(2),
    width: "50%"
  }
});

const mediumBreakpointStyles = breakpoint => ({
  ...smallBreakpointStyles(breakpoint),
  headline: {
    ...fontFactory({
      font: "headline"
    }),
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    color: colours.functional.white,
    marginBottom: 0
  },
  strapline: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colours.functional.greyLabel,
    paddingTop: spacing(1),
    paddingBottom: 0
  }
});

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles(breakpoint)
    : mediumBreakpointStyles(breakpoint);
