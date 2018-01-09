import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const iosStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    marginBottom: 0
  }
});

export default iosStyles;
