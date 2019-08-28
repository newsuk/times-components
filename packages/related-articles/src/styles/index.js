import { StyleSheet } from "react-native";
import styleguideFactory from "@times-components/styleguide";
import sharedStyles from "./shared";

const { fontFactory, spacing } = styleguideFactory();

const styles = StyleSheet.create({
  ...sharedStyles,
  headline: {
    ...sharedStyles.headline,
    ...fontFactory({
      font: "headlineRegular",
      fontSize: "smallHeadline"
    }),
    fontWeight: "100",
    lineHeight: 28
  },
  title: {
    ...sharedStyles.title,
    paddingVertical: spacing(1)
  }
});

export default styles;
