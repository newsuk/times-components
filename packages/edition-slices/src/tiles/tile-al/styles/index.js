import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const fontSizeResolver = {
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

export default breakpoint => ({
  container: {
    flex: 1,
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
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
