import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const fontSizeResolver = {
  [editionBreakpoints.medium]: 20,
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

export default breakpoint => ({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint]
  },
  summaryContainer: {
    width: "100%"
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
