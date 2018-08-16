import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingTop: spacing(1)
  },
  credits: {
    ...sharedStyles.credits,
    lineHeight: 20
  },
  text: {
    ...sharedStyles.text,
    lineHeight: 20
  }
});

export default styles;
