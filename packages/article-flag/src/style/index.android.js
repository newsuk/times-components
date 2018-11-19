import { fontSizes, spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    fontSize: fontSizes.meta,
    marginTop: spacing(1)
  },
  view: {
    ...sharedStyles.view,
    marginTop: spacing(-1)
  }
};

export default styles;
