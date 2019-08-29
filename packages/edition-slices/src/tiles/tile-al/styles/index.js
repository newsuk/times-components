import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  }
};

export default styles;
