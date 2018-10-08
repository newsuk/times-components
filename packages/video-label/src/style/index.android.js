import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  iconContainer: {
    ...sharedStyles.iconContainer,
    paddingBottom: 0
  },
  title: {
    ...sharedStyles.title,
    top: 1
  },
  ...sharedStyles
});

export default styles;
