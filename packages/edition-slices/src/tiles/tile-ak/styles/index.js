import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 22,
  [editionBreakpoints.wide]: 30,
  [editionBreakpoints.huge]: 35
};

const styles = (breakpoint = editionBreakpoints.medium) => ({
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
    marginHorizontal: spacing(1),
    height: 150,
    overflow: "hidden"
  }
});

export default styles;
