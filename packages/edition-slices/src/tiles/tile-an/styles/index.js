import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    })
  },
  imageContainer: {
    overflow: "hidden"
  },
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: spacing(2)
  }
};

export default styles;
