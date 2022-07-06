import { fonts, spacing } from "@times-components/ts-styleguide";

const styles = {
  container: {
    flex: 1,
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
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
