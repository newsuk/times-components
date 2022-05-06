import { StyleSheet } from "react-native";
import { styleguide } from "@times-components/ts-components";
import sharedStyles from "./shared";

const { spacing } = styleguide();
const styles = StyleSheet.create({
  ...sharedStyles,
  jobTitle: {
    ...sharedStyles.jobTitle,
    WebkitFontSmoothing: "antialiased"
  },
  twitter: {
    ...sharedStyles.twitter,
    alignItems: "flex-end",
    paddingBottom: spacing(2),
    paddingTop: spacing(3)
  },
  twitterIcon: {
    alignSelf: "center"
  },
  twitterLink: {
    ...sharedStyles.twitterLink
  }
});

export default styles;
