import { spacing } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: spacing(3)
  }
};

export default styles;
