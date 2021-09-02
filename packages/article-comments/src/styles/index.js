import { StyleSheet } from "react-native";
import { fonts, fontSizes } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  link: {
    ...sharedStyles.link,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.commentsGuidelines
  }
});

export default styles;
