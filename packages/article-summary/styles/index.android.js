import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  labelWrapper: {
    ...sharedStyles.labelWrapper,
    marginBottom: spacing
  }
};

export default styles;
