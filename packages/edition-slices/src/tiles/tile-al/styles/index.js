import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

export default breakpoint => ({
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint]
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  }
});
