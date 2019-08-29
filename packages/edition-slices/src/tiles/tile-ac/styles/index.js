import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const paddingVertical = {
  [editionBreakpoints.small]: spacing(3),
  [editionBreakpoints.medium]: spacing(3),
  [editionBreakpoints.wide]: spacing(6),
  [editionBreakpoints.huge]: spacing(6)
};

export default breakpoint => ({
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
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
    paddingHorizontal: spacing(4),
    paddingVertical: paddingVertical[breakpoint] || spacing(3)
  }
});
