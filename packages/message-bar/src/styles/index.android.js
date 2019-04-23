import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  MessageBarBody: {
    ...sharedStyles.MessageBarBody,
    color: "green"
  }
});

export default styles;
