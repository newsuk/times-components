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
    lineHeight: 21
  }
});

export default styles;
