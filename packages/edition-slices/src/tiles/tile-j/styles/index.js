import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    marginBottom: spacing(2)
  },
  imageContainer: {
    width: "40%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    width: "60%"
  }
};

export default styles;
