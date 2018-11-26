import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headline: {
    ...sharedStyles.headline,
    lineHeight: 25
  },
  title: {
    ...sharedStyles.title,
    paddingVertical: spacing(1)
  }
});

export default styles;
