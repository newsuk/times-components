import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginBottom: spacing(4)
  }
});

export default webStyles;
