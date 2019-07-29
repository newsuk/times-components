import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  star: {
    starButton: {
      right: spacing(1)
    }
  }
};

export default styles;
