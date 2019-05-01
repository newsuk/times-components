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
    width: "50%",
    paddingRight: spacing(2)
  },
  summaryContainer: {
    paddingBottom: spacing(1),
    paddingRight: spacing(2),
    width: "50%"
  }
};

export default styles;
