import { StyleSheet } from "react-native";
import { fontSizes, spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const androidStyles = {
  ...sharedStyles,
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontSize: fontSizes.headline,
    lineHeight: 33,
    fontWeight: "400",
    marginTop: spacing(3),
    marginBottom: spacing(3)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 28,
    paddingBottom: 12,
    marginTop: -7
  },
  articleFlag: {
    ...sharedStyles.articleFlag,
    paddingTop: spacing(1)
  },
  articleLabelWrapper: { marginTop: spacing(2), marginBottom: spacing(-2.75) }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...androidStyles
});

export default styles;
