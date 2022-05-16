import { spacing } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const newStyles = {
  ...sharedStyles,
  leadAsset: {
    marginBottom: spacing(4)
  },
  metaContainer: {
    justifyContent: "center",
    paddingVertical: spacing(2)
  }
};

export default newStyles;
