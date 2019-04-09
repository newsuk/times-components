import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    lineHeight: 12
  }
});

export default styles;
