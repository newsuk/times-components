import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

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
