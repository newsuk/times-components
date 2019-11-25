import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    lineHeight: 12,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0
  }
});

export default styles;
