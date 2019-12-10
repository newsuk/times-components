import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  iconContainer: {
    ...sharedStyles.iconContainer,
    marginBottom: 0,
    paddingBottom: 0
  },
  title: {
    ...sharedStyles.title,
    lineHeight: 12,
    paddingTop: 0,
    marginTop: 0
  }
});

export default styles;
