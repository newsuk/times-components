import { colours, fonts, spacing } from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

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
  star: verticalStyles,
  strapline: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: spacing(8)
  }
};

export default styles;
