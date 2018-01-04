import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: 20
  }
});

export default webStyles;
