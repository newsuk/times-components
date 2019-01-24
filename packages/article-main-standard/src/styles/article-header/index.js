import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontWeight: "700",
    marginTop: spacing(3)
  },
  articleLabelWrapper: {
    marginBottom: spacing(-2.75),
    marginTop: spacing(2)
  },
  flags: {
    ...sharedStyles.flags,
    marginTop: spacing(1)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...nativeStyles
});

export default styles;
