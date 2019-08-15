import {
  colours,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = fontSize => ({
  container: {
    backgroundColor: colours.functional.darkSupplement,
    flexDirection: "row",
    padding: spacing(2)
  },
  flagColour: {
    color: colours.functional.greyLabel
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize
    }),
    color: colours.functional.white
  },
  imageContainer: {
    width: "50%"
  },
  summary: {
    color: colours.functional.greyLabel
  },
  strapline: {
    fontSize: 14
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    width: "50%"
  }
});

export default breakpoint => {
  const fontSize =
    breakpoint === editionBreakpoints.small ||
    breakpoint === editionBreakpoints.medium
      ? "body"
      : "headline";
  return styles(fontSize);
};
