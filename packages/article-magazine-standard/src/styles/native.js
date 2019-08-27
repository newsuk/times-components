import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  },
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(4)
  }
};

export default nativeStyles;
