import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  titleContainer: {
    ...sharedStyles.titleContainer,
    padding: spacing(3)
  }
});

export default styles;
