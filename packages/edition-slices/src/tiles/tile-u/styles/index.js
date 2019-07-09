import {
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = fontSize => ({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize
    }),
    paddingVertical: spacing(1)
  },
  imageContainer: {
    width: "60%"
  },
  summaryContainer: {
    paddingBottom: spacing(1),
    paddingRight: spacing(4),
    width: "40%"
  }
});

export default breakpoint =>
  editionBreakpoints.huge === breakpoint
    ? styles("articleHeadline")
    : styles("tileLeadHeadline");
