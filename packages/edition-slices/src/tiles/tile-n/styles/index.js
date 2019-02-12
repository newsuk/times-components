import { colours, fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    backgroundColor: colours.functional.darkSupplement,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    color: colours.functional.white
  },
  imageContainer: {
    width: "50%"
  },
  summary: {
    color: colours.functional.greyLabel
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(1),
    width: "50%"
  }
};

export default styles;
