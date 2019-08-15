import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  link: {
    ...sharedStyles.link,
    lineHeight: sharedStyles.link.fontSize,
    fontWeight: "bold"
  },
  nonLinkText: {
    ...sharedStyles.nonLinkText,
    lineHeight: sharedStyles.nonLinkText.fontSize
  },
  opinion: {
    ...sharedStyles.opinion,
    lineHeight: sharedStyles.opinion.fontSize
  },
  text: {
    ...sharedStyles.text,
    lineHeight: sharedStyles.text.fontSize
  }
});

export default styles;
