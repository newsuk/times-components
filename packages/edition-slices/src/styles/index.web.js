import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  EditionSlicesBody: {
    ...sharedStyles.EditionSlicesBody,
    color: "blue"
  }
});

export default styles;
