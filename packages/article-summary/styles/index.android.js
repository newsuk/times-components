import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  labelWrapper: {
    ...sharedStyles.labelWrapper,
    marginBottom: spacing(1)
  }
};

export default styles;
