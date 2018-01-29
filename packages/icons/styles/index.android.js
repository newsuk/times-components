import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  IconsBody: {
    ...sharedStyles.IconsBody,
    color: "green"
  }
});

export default webStyles;
