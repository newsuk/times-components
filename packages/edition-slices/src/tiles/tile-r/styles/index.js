import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    marginBottom: spacing(3),
    marginHorizontal: spacing(4),
    marginTop: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 45,
    lineHeight: 45
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
};

export default styles;
