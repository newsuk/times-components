import { colours, fonts, spacing } from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const styles = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35,
    marginBottom: spacing(2),
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  star: verticalStyles,
  summaryContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    paddingBottom: spacing(3),
    paddingHorizontal: spacing(4),
    paddingTop: spacing(4)
  }
};

export default styles;
