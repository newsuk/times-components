import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";
import sharedStyles, { captionStyles, tabletCaptionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  bottomSafeView: {
    ...sharedStyles.bottomSafeView,
    backgroundColor: colours.functional.overlayGradientFallback
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
