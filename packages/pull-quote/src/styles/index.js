import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  // iOS Font hack
  caption: {
    ...sharedStyles.caption,
    paddingTop: 4
  },
  container: {
    ...sharedStyles.container,
    marginBottom: 0,
    paddingBottom: spacing(5),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1)
  },
  link: {
    ...sharedStyles.link,
    paddingTop: 2
  }
});

export default styles;
