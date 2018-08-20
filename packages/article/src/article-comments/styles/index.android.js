import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  supporting: {
    ...sharedStyles.supporting,
    lineHeight: 21
  }
});

export default styles;
