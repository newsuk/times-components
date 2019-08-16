import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  label: {
    ...sharedStyles.label,
    marginBottom: spacing(3)
  }
});

export default styles;
