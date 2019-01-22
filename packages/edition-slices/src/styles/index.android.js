import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  EditionSlicesBody: {
    ...sharedStyles.EditionSlicesBody,
    color: "green"
  }
});

export default styles;
