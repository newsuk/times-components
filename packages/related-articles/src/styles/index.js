import { spacing } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    paddingTop: spacing(1)
  },
  titleContainer: {
    ...sharedStyles.titleContainer,
    padding: spacing(3)
  }
};

export default styles;
