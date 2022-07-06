import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const paddingVerticalResolver = {
  [editionBreakpoints.medium]: spacing(8),
  [editionBreakpoints.wide]: spacing(6),
  [editionBreakpoints.huge]: spacing(14)
};

const fontSizeResolver = {
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 30,
  [editionBreakpoints.huge]: 35
};

export default breakpoint => ({
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    marginBottom: 0,
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.functional.border,
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    paddingTop: paddingVerticalResolver[breakpoint],
    paddingBottom: paddingVerticalResolver[breakpoint]
  }
});
