import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...globalStyle,
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
