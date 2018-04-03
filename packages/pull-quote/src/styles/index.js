import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const iosStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingTop: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(5),
    marginBottom: 0
  },
  // iOS Font hack
  caption: {
    ...sharedStyles.caption,
    paddingTop: 4
  },
  link: {
    ...sharedStyles.link,
    paddingTop: 4
  }
});

export default iosStyles;
