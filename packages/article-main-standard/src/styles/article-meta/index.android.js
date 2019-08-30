import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 0
  },
  byline: {
    ...sharedStyles.byline,
    lineHeight: 26
  },
  datePublication: {
    ...sharedStyles.datePublication,
    lineHeight: 21,
    marginTop: 0
  }
});

export default styles;
