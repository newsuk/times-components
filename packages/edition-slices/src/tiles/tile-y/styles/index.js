import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
};

export default styles;
