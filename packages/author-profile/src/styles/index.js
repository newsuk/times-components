import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  ...sharedStyles,
  twitter: {
    ...sharedStyles.twitter,
    marginTop: spacing(1)
  },
  twitterIcon:{
    ...sharedStyles.twitterIcon,
    marginTop: spacing(0.25)
  }
});

export default styles;
