import {
  colours,
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const fontSizeResolver = {
  [editionBreakpoints.medium]: 40,
  [editionBreakpoints.wide]: 40,
  [editionBreakpoints.huge]: 45
};

export default breakpoint => ({
  container: {
    flex: 1,
    padding: spacing(2),
    paddingTop: spacing(3)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint]
  },
  strapline: {
    fontFamily: fonts.headlineRegular,
    color: colours.functional.primary,
    fontSize: 24,
    lineHeight: 26,
    paddingTop: spacing(2),
    paddingBottom: 0
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
