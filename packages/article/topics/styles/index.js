import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const topicStyles = {
  ...sharedStyles,
  topicsContainer: {
    ...sharedStyles.topicsContainer,
    marginLeft: 2 * spacing,
    marginRight: 2 * spacing
  }
};

export default topicStyles;
