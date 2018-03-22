import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const androidStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  }
});

export default androidStyles;
