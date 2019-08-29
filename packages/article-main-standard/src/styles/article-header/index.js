import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadLineText: {
    ...sharedStyles.articleHeadLineText,
    fontWeight: "700",
    marginTop: spacing(1)
  },
  articleLabelWrapper: {
    marginBottom: spacing(0),
    marginTop: spacing(2)
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
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
  ...nativeStyles
});

export default styles;
