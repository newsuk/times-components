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
    }),
    paddingBottom: spacing(1)
  },
  imageContainer: {
    overflow: "hidden"
  },
  summaryContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: spacing(1)
  }
};

export default styles;
