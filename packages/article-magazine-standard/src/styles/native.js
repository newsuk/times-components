import sharedStyles from "./shared";
import { spacing } from "@times-components/styleguide"

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
