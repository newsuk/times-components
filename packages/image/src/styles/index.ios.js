import { StyleSheet } from "react-native";
import { colours, spacing } from "@times-components/styleguide";
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
  },
  buttonContainer: {
    ...sharedStyles.buttonContainer,
    marginLeft: spacing(2)
  }
});

export { captionStyles, tabletCaptionStyles };
export default styles;
