import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingBottom: spacing(2),
    paddingHorizontal: spacing(4)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
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
