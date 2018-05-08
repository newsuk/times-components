import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  TopicBody: {
    ...sharedStyles.TopicBody,
    color: "blue"
  }
});

export default webStyles;
