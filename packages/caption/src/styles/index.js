import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  text: {
    ...sharedStyles.text,
    lineHeight: 16
  }
});

export default styles;
