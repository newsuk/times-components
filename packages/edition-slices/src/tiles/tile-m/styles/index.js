import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingBottom: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 22,
    marginBottom: spacing(1),
    marginTop: spacing(4),
    textAlign: "center"
  },
  strapline: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  }
};

export default styles;
