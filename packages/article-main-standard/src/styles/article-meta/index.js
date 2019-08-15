import { StyleSheet } from "react-native";
import { spacing } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  byline: {
    ...sharedStyles.byline,
    lineHeight: sharedStyles.byline.fontSize
  },
  datePublication: {
    ...sharedStyles.datePublication,
    lineHeight: sharedStyles.datePublication.fontSize
  },
  articleMetaElement: {
    paddingTop: spacing(1)
  }
});

export default styles;
