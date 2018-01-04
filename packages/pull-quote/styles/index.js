import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const iosStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default iosStyles;
