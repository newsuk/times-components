import { colours, fonts, spacing } from "@times-components/styleguide";

const styles = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35,
    marginBottom: spacing(2),
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    paddingBottom: spacing(3),
    paddingHorizontal: spacing(8),
    paddingTop: spacing(4)
  }
};

export default styles;
