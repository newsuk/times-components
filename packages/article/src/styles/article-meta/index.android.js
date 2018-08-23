import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...globalStyle,
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 7,
    paddingBottom: 6
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
