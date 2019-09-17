import {
  colours,
  fonts,
  fontSizes,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 40,
  [editionBreakpoints.huge]: 45
};

const keylinePadding = {
  [editionBreakpoints.medium]: spacing(2),
  [editionBreakpoints.wide]: spacing(3),
  [editionBreakpoints.huge]: spacing(3)
};

const styles = breakpoint => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing(2),
    paddingRight: keylinePadding[breakpoint]
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    paddingVertical: spacing(2),
    textAlign: "center",
    marginBottom: 0
  },
  imageContainer: {
    overflow: "hidden",
    width: 97,
    marginBottom: spacing(1)
  },
  strapline: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.meta,
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: spacing(1)
  },
  summaryContainer: {
    paddingTop: spacing(1),
    alignItems: "center"
  }
});

export default styles;
