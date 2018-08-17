import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  labelWrapper: {
    ...sharedStyles.labelWrapper,
    marginBottom: spacing(1)
  },
  headline: {
    ...sharedStyles.headline,
    fontWeight: "400"
  }
};

export default styles;
