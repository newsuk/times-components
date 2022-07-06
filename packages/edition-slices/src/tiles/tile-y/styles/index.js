import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const fontSizeResolver = {
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 30,
  [editionBreakpoints.huge]: 35
};

export default breakpoint => ({
  container: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(4)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint]
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
