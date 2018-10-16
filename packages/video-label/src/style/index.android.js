import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  iconContainer: {
    ...sharedStyles.iconContainer,
    paddingBottom: 0
  },
  title: {
    ...sharedStyles.title,
    top: 1
  }
});

export default styles;
