import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  name: {
    ...sharedStyles.name,
    paddingBottom: spacing(4)
  },
  description: {
    ...sharedStyles.description,
    paddingBottom: spacing(8)
  }
});

export default styles;
