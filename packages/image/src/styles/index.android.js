import { StyleSheet } from "react-native";
import sharedStyles, { captionStyles, tabletCaptionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  bottomSafeView: {
    ...sharedStyles.bottomSafeView,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
