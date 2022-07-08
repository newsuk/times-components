import {
  spacing,
  fonts,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const fontSizeResolver = {
  [editionBreakpoints.wide]: 40,
  [editionBreakpoints.huge]: 45
};

export default breakpoint => ({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint]
  },
  summaryContainer: {
    flex: 1,
    width: "41%",
    paddingRight: spacing(4)
  },
  imageContainer: {
    width: "59%"
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
