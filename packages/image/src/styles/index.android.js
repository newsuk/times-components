import { StyleSheet } from "react-native";
import sharedStyles, { captionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  buttonContainer: {
    alignItems: "flex-end",
    margin: 16
  }
});

export { captionStyles };
export default styles;
