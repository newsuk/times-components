import { StyleSheet } from "react-native";
import { colours } from "@times-components-native/styleguide";
import sharedStyles, { captionStyles, tabletCaptionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  bottomSafeView: {
    ...sharedStyles.bottomSafeView,
    backgroundColor: colours.functional.overlayGradientFallback
  },
  modalImageContainer: {
    ...sharedStyles.modalImageContainer,
    backgroundColor: colours.functional.black
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
