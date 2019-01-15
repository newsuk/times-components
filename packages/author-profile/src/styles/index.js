import { StyleSheet } from "react-native";
import { spacing, tabletWidth } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  biography: {
    ...sharedStyles.biography,
    maxWidth: tabletWidth
  },
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
