import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const androidStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default androidStyles;
