import { fonts, spacing } from "@times-components/ts-styleguide";

const styles = {
  container: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(2),
    flex: 1
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
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
