import { fontFactory, spacing } from "@times-components/ts-styleguide";

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
    paddingLeft: spacing(2),
    paddingBottom: spacing(1),
    width: "50%"
  }
};

export default styles;
