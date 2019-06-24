import {
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = fontSize => ({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingTop: spacing(2),
    paddingBottom: spacing(3)
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
