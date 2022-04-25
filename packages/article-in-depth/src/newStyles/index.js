import styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";

const { spacing } = styleguide();

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
