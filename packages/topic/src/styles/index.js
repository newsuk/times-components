import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  TopicBody: {
    ...sharedStyles.TopicBody,
    color: "red"
  }
});

export default webStyles;
