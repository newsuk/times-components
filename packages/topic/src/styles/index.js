import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  description: {
    ...sharedStyles.description,
    paddingBottom: spacing(3)
  }
});

export default styles;
