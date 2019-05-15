import {
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = fontSize => ({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize
    })
  },
  imageContainer: {
    width: "66.66%"
  },
  summaryContainer: {
    paddingBottom: spacing(1),
    paddingRight: spacing(4),
    width: "33.33%"
  }
});

export default breakpoint =>
  editionBreakpoints.huge === breakpoint
    ? styles("articleHeadline")
    : styles("tileLeadHeadline");
