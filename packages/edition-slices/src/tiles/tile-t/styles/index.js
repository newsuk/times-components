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
    width: "50%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    width: "50%"
  }
};

export default styles;
