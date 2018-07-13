import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    minWidth: 175,
    paddingRight: spacing(4)
  }
});

export default styles;
