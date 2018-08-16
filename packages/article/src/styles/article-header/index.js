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
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  },
  articleFlag: {
    ...sharedStyles.articleFlag,
    paddingTop: spacing(1)
  },
  articleLabelWrapper: { marginTop: spacing(2), marginBottom: spacing(-2.75) }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...nativeStyles
});

export default styles;
