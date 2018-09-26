import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  button: {
    ...sharedStyles.button,
    borderRadius: 4,
    elevation: 3,
    height: 36
  },
  text: {
    ...sharedStyles.text,
    lineHeight: 14,
    paddingTop: 0
  }
});

export default styles;
