import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 25,
    lineHeight: 25
  },
  imageContainer: {
    width: "66.66%"
  },
  summaryContainer: {
    paddingRight: spacing(2),
    paddingVertical: spacing(1),
    width: "33.33%"
  }
};

export default styles;
