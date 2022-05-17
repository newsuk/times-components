import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const headlineFontResolver = {
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 30,
  [editionBreakpoints.huge]: 35
};

export default breakpoint => ({
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3),
    paddingTop: spacing(3)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: headlineFontResolver[breakpoint],
    lineHeight: headlineFontResolver[breakpoint]
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
