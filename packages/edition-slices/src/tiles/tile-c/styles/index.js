import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: spacing(2)
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  summaryContainer: {
    flex: 1
  },
  flags: {
    marginBottom: spacing(2)
  }
};

export default styles;
