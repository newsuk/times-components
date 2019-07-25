import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35,
    paddingBottom: spacing(1)
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  }
};

export default styles;
