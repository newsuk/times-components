import { fonts, spacing } from "@times-components/ts-styleguide";

const styles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 0
  }
};

export default styles;
