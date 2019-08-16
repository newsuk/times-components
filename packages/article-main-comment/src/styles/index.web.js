import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  ...sharedStyles,
  label: {
    ...sharedStyles.label,
    marginBottom: spacing(3)
  }
});

export default styles;
