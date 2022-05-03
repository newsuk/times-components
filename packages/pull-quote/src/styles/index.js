import { StyleSheet } from "react-native";
import { styleguide } from "@times-components/ts-components";
import sharedStyles from "./shared";

const { spacing } = styleguide();
const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: spacing(3)
  }
});

export default styles;
