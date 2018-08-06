import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  credits: {
    ...sharedStyles.credits,
    lineHeight: 17
  },
  text: {
    ...sharedStyles.text,
    lineHeight: 17
  }
});

export default styles;
