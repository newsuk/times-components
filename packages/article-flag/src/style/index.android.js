import { fontSizes } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    fontSize: fontSizes.meta,
    marginTop: 5
  }
};

export default styles;
