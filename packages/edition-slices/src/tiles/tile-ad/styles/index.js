import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20
  },
  imageContainer: {
    width: "30%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    width: "70%"
  }
};

export default styles;
