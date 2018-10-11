import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...globalStyle,
  ...sharedStyles,
  articleMetaElement: {
    ...sharedStyles.articleMetaElement,
    paddingBottom: 4,
    paddingTop: 9
  },
  byline: {
    ...sharedStyles.byline
  }
});

export default styles;
