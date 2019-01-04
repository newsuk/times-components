import { StyleSheet } from "react-native";
import { spacing, tabletWidth } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  description: {
    ...sharedStyles.description,
    maxWidth: tabletWidth,
    paddingBottom: spacing(8)
  },
  name: {
    ...sharedStyles.name,
    paddingBottom: spacing(5)
  }
});

export default styles;
