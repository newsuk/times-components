import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  twitter: {
    ...sharedStyles.twitter,
    alignItems: "center"
  }
});

export default styles;
