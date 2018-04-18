import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  ShavingbarBody: {
    ...sharedStyles.ShavingbarBody,
    color: "red"
  }
});

export default webStyles;
