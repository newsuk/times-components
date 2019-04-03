import { spacing } from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const styles = {
  container: {
    alignItems: "center",
    paddingVertical: spacing(2)
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  star: {
    ...verticalStyles
  }
};

export default styles;
