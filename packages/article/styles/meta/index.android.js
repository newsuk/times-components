import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...globalStyle,
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingTop: 6,
    paddingBottom: 8
  },
  byline: {
    ...sharedStyles.byline,
    lineHeight: 17
  }
});

export default styles;
