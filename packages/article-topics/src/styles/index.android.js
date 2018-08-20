import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  text: {
    ...sharedStyles.text,
    paddingTop: spacing(1),
    paddingBottom: spacing(1)
  }
});

export default styles;
