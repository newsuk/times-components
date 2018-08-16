import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  titleContainer: {
    ...sharedStyles.titleContainer,
    padding: spacing(3)
  },
  title: {
    ...sharedStyles.title,
    paddingTop: spacing(0)
  },
  headline: {
    ...sharedStyles.headline,
    marginTop: spacing(-1)
  },
  opinionByline: {
    ...sharedStyles.opinionByline,
    lineHeight: 28,
    marginTop: spacing(-1)
  }
});

export default styles;
