import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    lineHeight: 11
  },
  iconContainer: {
    ...sharedStyles.iconContainer,
    paddingBottom: 1
  }
});

export default styles;
