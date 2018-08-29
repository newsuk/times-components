import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  labelWrapper: {
    ...sharedStyles.labelWrapper,
    marginBottom: spacing(1)
  },
  headline: {
    ...sharedStyles.headline,
    fontWeight: "400"
  }
});

export default styles;
