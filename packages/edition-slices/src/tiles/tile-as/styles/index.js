import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 18,
    lineHeight: 18
  },
  summaryContainer: {
    flex: 1
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  }
};

export default styles;
