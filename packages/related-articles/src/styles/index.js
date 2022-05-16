import { StyleSheet } from "react-native";
import { spacing } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  title: {
    ...sharedStyles.title,
    paddingTop: spacing(1)
  },
  titleContainer: {
    ...sharedStyles.titleContainer,
    padding: spacing(3)
  }
});

export default styles;
