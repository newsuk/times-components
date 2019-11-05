import { StyleSheet } from "react-native";
import { fontSizes, spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const appStyles = {
  ...sharedStyles,
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontSize: fontSizes.headline,
    lineHeight: 33,
    marginBottom: spacing(1),
    marginTop: spacing(1)
  },
  articleLabelWrapper: {
    marginBottom: spacing(0),
    marginTop: spacing(2)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 28,
    paddingBottom: spacing(2)
  },
  standFirstWithoutFlags: {
    paddingBottom: spacing(2)
  },
  metaContainer: {
    ...sharedStyles.metaContainer,
    marginTop: spacing(4)
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...appStyles
});

export default styles;
