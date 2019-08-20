import {
  colours,
  fonts,
  fontSizes,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 35,
  [editionBreakpoints.huge]: 45
};

const styles = (breakpoint = editionBreakpoints.medium) => ({
  container: {
    flex: 1,
    alignItems: "center",
    padding: spacing(2)
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
    flex: 1,
    paddingTop: spacing(1),
    alignItems: "center"
  }
});

export default styles;
