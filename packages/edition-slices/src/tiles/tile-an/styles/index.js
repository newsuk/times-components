import { colours, fontFactory, spacing } from "@times-components/styleguide";

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
    borderColor: colours.functional.contrast,
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 9999
  },
  summaryContainer: {
    justifyContent: "center",
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  }
};

export default styles;
