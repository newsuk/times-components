import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  link: {
    ...sharedStyles.link,
    lineHeight: 19
  },
  text: {
    ...sharedStyles.text,
    lineHeight: 19
  }
});

export default styles;
