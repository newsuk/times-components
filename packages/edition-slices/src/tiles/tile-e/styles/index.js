import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    })
  },
  imageContainer: {
    width: "45%"
  },
  summaryContainer: {
    paddingBottom: spacing(1),
    paddingHorizontal: spacing(2),
    width: "55%"
  }
};

export default styles;
