import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

export default (scale, isTablet) => {
  const shared = sharedStyles(scale, isTablet);
  return {
    ...shared,
    container: {
      ...shared.container,
      paddingLeft: spacing(2),
      paddingRight: spacing(2)
    },
    content: {
      ...shared.content,
      lineHeight: 32
    }
  };
};
