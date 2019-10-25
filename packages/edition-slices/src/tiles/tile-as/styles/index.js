import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/styleguide";

const headlineFontSize = {
  [editionBreakpoints.medium]: 18,
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

export default breakpoint => ({
  container: {
    flex: 1,
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: headlineFontSize[breakpoint],
    lineHeight: headlineFontSize[breakpoint]
  },
  summaryContainer: {
    flex: 1
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
