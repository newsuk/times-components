import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 40,
  [editionBreakpoints.huge]: 45,
  [editionBreakpoints.wide]: 45
};

const hugeScreenContainerStyle = {
  width: "86%",
  paddingHorizontal: spacing(0),
  alignSelf: "center"
};

export default breakpoint => ({
  container: {
    paddingBottom: spacing(3),
    paddingHorizontal: spacing(4),
    paddingTop: spacing(2),
    ...(breakpoint === editionBreakpoints.huge && hugeScreenContainerStyle)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint]
  }
});
