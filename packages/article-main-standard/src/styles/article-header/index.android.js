import { StyleSheet } from "react-native";
import { fontSizes, spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const androidStyles = {
  ...sharedStyles,
  articleFlag: {
    ...sharedStyles.articleFlag,
    paddingTop: spacing(1)
  },
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontSize: fontSizes.headline,
    fontWeight: "400",
    lineHeight: 33,
    marginBottom: spacing(3),
    marginTop: spacing(3)
  },
  articleLabelWrapper: {
    marginBottom: spacing(-2.75),
    marginTop: spacing(2)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 28,
    marginTop: -7,
    paddingBottom: 12
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...androidStyles
});

export default styles;
