import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 20,
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

const containerHeightResolver = {
  [editionBreakpoints.medium]: 143,
  [editionBreakpoints.wide]: 195,
  [editionBreakpoints.huge]: 243
};

const styles = breakpoint => ({
  header: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2),
    height: 80
  },
  headline: {
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint]
  },
  imageContainer: {
    alignSelf: "flex-end",
    width: "85%",
    marginTop: spacing(-5)
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginHorizontal: spacing(2),
    height: containerHeightResolver[breakpoint],
    overflow: "hidden"
  }
});

export default styles;
