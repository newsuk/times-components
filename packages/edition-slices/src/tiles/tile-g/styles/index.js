import { colours, fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    margin: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    })
  },
  imageContainer: {
    borderColor: colours.functional.contrast,
    borderRadius: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    width: "25%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    width: "75%"
  }
};

export default styles;