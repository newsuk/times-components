import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  twitter: {
    ...sharedStyles.twitter,
    marginTop: spacing(1)
  },
  twitterIcon: {
    ...sharedStyles.twitterIcon,
    marginTop: spacing(0.25)
  }
});

export default styles;
