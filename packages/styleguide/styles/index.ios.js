import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  StyleguideBody: {
    ...sharedStyles.StyleguideBody,
    color: "blue"
  }
});

export default webStyles;
