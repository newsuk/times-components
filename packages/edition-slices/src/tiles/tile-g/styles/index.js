import { Dimensions } from "react-native";
import { colours, fontFactory, spacing } from "@times-components/styleguide";

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
    borderColor: colours.functional.contrast,
    borderRadius: Dimensions.get("window").width / 4,
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
