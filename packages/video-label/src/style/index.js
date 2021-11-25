import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: 1
  },
  iconContainer: {
    ...sharedStyles.iconContainer,
    alignSelf: "center",
    paddingBottom: 2
  },
  title: {
    ...sharedStyles.title,
    lineHeight: 12
  }
});

export default styles;
