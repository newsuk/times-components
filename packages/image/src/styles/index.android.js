import { StyleSheet } from "react-native";
import sharedStyles, { captionStyles, tabletCaptionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  buttonContainer: {
    alignItems: "flex-end",
    margin: 16
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
