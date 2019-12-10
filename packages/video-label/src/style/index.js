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
  },
  container: {
    ...sharedStyles.container,
    marginTop: 0,
    marginBottom: -3
  }
});

export default styles;
