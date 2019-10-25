import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.medium]: 20,
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

export default breakpoint => ({
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint]
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
});
