import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  textStyle: {
    ...sharedStyles.textStyle,
    paddingTop: 3
  }
});

export default styles;
