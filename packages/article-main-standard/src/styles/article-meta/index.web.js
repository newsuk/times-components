import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement
  },
  byline: {
    ...sharedStyles.byline,
    lineHeight: 21
  },
  datePublication: {
    ...sharedStyles.datePublication,
    lineHeight: sharedStyles.datePublication.fontSize
  }
});

export default styles;
