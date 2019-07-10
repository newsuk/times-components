import { fontSizes } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    fontSize: fontSizes.meta,
    lineHeight: fontSizes.meta,
    marginTop: 3
  },
  view: {
    ...sharedStyles.view,
    marginTop: -3
  }
};

export default styles;
