import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headline: {
    ...sharedStyles.headline,
    fontWeight: "900",
    includeFontPadding: false
  },
  labelWrapper: {
    ...sharedStyles.labelWrapper
  },
  text: {
    ...sharedStyles.text,
    marginBottom: 0
  },
  metaText: {
    ...sharedStyles.metaText,
    marginTop: 0,
    marginBottom: 0
  },
  strapline: {
    ...sharedStyles.strapline,
    paddingBottom: 0,
    paddingTop: 0,
    includeFontPadding: false
  }
});

export default styles;
