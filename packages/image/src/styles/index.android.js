import { StyleSheet } from "react-native";
import sharedStyles, { captionStyles, tabletCaptionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  buttonContainer: {
    alignItems: "flex-end"
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
