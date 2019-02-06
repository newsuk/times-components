import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    })
  },
  imageContainer: {
    width: "33.33%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    width: "66.66%"
  }
};

export default styles;
