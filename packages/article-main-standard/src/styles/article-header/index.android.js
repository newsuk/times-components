import { StyleSheet } from "react-native";
import { fontSizes, spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const androidStyles = {
  ...sharedStyles,
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontSize: fontSizes.headline,
    fontWeight: "400",
    lineHeight: 33,
    marginBottom: spacing(2),
    marginTop: spacing(1)
  },
  articleLabelWrapper: {
    marginBottom: spacing(0),
    marginTop: spacing(2)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 28,
    marginTop: -2,
    paddingBottom: 12
  },
  standFirstWithoutFlags: {
    paddingBottom: spacing(4)
  },
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(4)
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...androidStyles
});

export default styles;
