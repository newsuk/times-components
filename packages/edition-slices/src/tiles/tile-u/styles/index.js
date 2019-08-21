import { fonts, spacing } from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    width: "100%",
    paddingBottom: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: spacing(2)
  }
};

export default mediumBreakpointStyles;
