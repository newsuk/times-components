import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    })
  },
  imageContainer: {
    borderRadius: 9999,
    overflow: "hidden"
  },
  summaryContainer: {
    justifyContent: "center",
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  }
};

export default styles;
