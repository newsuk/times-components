import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headline: {
    ...sharedStyles.headline,
    fontWeight: "400",
    marginBottom: spacing(1),
    includeFontPadding: false
  },
  labelWrapper: {
    ...sharedStyles.labelWrapper,
    marginBottom: spacing(1)
  },
  text: {
    ...sharedStyles.text,
    marginBottom: 0
  },
  metaText: {
    ...sharedStyles.metaText,
    marginTop: spacing(1)
  },
  strapline: {
    ...sharedStyles.strapline,
    paddingBottom: spacing(1.5),
    paddingTop: spacing(0.5),
    includeFontPadding: false
  }
});

export default styles;
