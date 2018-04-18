import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  ShavingbarBody: {
    ...sharedStyles.ShavingbarBody,
    color: "blue"
  }
});

export default webStyles;
