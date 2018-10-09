import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  headline: {
    ...sharedStyles.headline,
    marginTop: spacing(-1)
  },
  opinionByline: {
    ...sharedStyles.opinionByline,
    lineHeight: 28,
    marginTop: spacing(-1)
  },
  title: {
    ...sharedStyles.title,
    paddingTop: spacing(0)
  },
  titleContainer: {
    ...sharedStyles.titleContainer,
    padding: spacing(3)
  },
  ...sharedStyles
});

export default styles;
