import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  errorBody: {
    ...sharedStyles.errorBody,
    lineHeight: 21
  },
  supporting: {
    ...sharedStyles.supporting,
    lineHeight: 21
  }
});

export default styles;
