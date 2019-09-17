import {
  spacing,
  fonts,
  editionBreakpoints
} from "@times-components/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.wide]: 40,
  [editionBreakpoints.huge]: 45
};

export default breakpoint => ({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1,
    width: "41%",
    paddingRight: spacing(4)
  },
  imageContainer: {
    width: "59%"
  }
});
