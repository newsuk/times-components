import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  headline: {
    ...sharedStyles.headline,
    fontWeight: "400"
  },
  labelWrapper: {
    ...sharedStyles.labelWrapper,
    marginBottom: spacing(1)
  },
  text: {
    ...sharedStyles.text,
    marginBottom: 0
  }
});

export default styles;
