import { spacing } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  leadAsset: {
    marginBottom: spacing(4)
  },
  metaContainer: {
    justifyContent: "center",
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  }
};

export default styles;
