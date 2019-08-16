import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    lineHeight: sharedStyles.title.fontSize,
    paddingTop: 0,
    marginTop: 0
  }
});

export default styles;
