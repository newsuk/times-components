import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headlineWrapper: {
    ...sharedStyles.headlineWrapper,
    lineHeight: 25
  },
  text: {
    ...sharedStyles.text,
    marginBottom: 0
  },
  metaText: {
    ...sharedStyles.metaText,
    marginTop: spacing(1)
  }
});

export default styles;
