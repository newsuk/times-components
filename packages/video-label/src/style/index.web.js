import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: 3
  },
  iconContainer: {
    ...sharedStyles.iconContainer,
    paddingBottom: 3
  },
  title: {
    ...sharedStyles.title,
    lineHeight: 11
  }
});

export default styles;
