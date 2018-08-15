import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  twitter: {
    ...sharedStyles.twitter,
    alignItems: "center"
  },
  jobTitle: {
    ...sharedStyles.jobTitle,
    marginTop: spacing(2)
  }
});

export default styles;
