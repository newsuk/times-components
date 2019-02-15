import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

export default (scale, isTablet) => {
  const shared = sharedStyles(scale, isTablet);
  return {
    ...shared,
    // iOS Font hack
    caption: {
      ...shared.caption,
      paddingTop: 4
    },
    container: {
      ...shared.container,
      marginBottom: 0,
      paddingBottom: spacing(2),
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
      paddingTop: spacing(1)
    },
    link: {
      ...shared.link,
      paddingTop: 2
    },
    text: {
      ...shared.text,
      paddingTop: 4
    }
  };
};
