import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30
  },
  imageContainer: {
    paddingBottom: spacing(1)
  },
  summaryContainer: {
    paddingVertical: spacing(1),
    width: "50%"
  }
};

export default styles;
