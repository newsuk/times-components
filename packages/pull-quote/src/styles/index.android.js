import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  content: {
    ...sharedStyles.content,
    lineHeight: 32
  }
});

export default styles;
