import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  jobTitle: {
    ...sharedStyles.jobTitle,
    marginTop: spacing(2)
  },
  twitter: {
    ...sharedStyles.twitter,
    alignItems: "center"
  }
});

export default styles;
