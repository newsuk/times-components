import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import { tabletWidth } from "@times-components/utils";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  biography: {
    ...sharedStyles.biography,
    maxWidth: tabletWidth
  },
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
