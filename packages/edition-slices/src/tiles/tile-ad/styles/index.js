import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    marginBottom: spacing(2)
  },
  imageContainer: {
    width: "45%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    width: "55%"
  }
};

export default styles;
