import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 25,
    lineHeight: 25,
    paddingVertical: spacing(1)
  },
  imageContainer: {
    width: "60%"
  },
  summaryContainer: {
    paddingBottom: spacing(1),
    width: "40%"
  }
};

export default styles;
