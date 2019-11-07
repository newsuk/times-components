import { StyleSheet } from "react-native";
import { colours } from "@times-components/styleguide";
import sharedStyles, { captionStyles, tabletCaptionStyles } from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  bottomSafeView: {
    ...sharedStyles.bottomSafeView,
    justifyContent: "flex-end"
  },
  modalImageContainer: {
    ...sharedStyles.modalImageContainer,
    backgroundColor: colours.functional.black
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
