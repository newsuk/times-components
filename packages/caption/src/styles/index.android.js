import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  credits: {
    ...sharedStyles.credits,
    lineHeight: 20
  },
  text: {
    ...sharedStyles.text,
    lineHeight: 20
  }
});

export default styles;
