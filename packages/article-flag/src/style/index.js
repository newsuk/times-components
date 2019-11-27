import { fontSizes, spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  flags: {
    ...sharedStyles.flags,
    marginBottom: spacing(1),
    marginTop: spacing(1)
  },
  title: {
    ...sharedStyles.title,
    fontSize: fontSizes.meta,
    lineHeight: fontSizes.meta
  },
  view: {
    ...sharedStyles.view,
    marginTop: -3
  }
};

export default styles;
