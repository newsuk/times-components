import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 45,
  [editionBreakpoints.wide]: 45,
  [editionBreakpoints.small]: 30,
  [editionBreakpoints.medium]: 30
};

export default breakpoint => ({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    marginBottom: spacing(1)
  },
  image: {
    alignSelf: "flex-end"
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: spacing(2),
    width: "50%"
  },
  summaryContainer: {
    paddingRight: spacing(2),
    paddingVertical: spacing(2),
    width: "50%"
  }
});
