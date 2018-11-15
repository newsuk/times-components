import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleFlag: {
    ...sharedStyles.articleFlag,
    paddingTop: spacing(1)
  },
  articleLabelWrapper: {
    marginBottom: spacing(-2.75),
    marginTop: spacing(2)
  },
  authorImage: {
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    width: 100,
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  }
};

const styles = StyleSheet.create({
  ...nativeStyles
});

export default styles;
