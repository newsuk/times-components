import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  IconsBody: {
    ...sharedStyles.IconsBody,
    color: "blue"
  }
});

export default webStyles;
