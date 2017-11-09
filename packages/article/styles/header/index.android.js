import { StyleSheet } from "react-native";
import globalStyle from "../article-global-style";
import sharedStyles from "./shared";

const androidStyles = {
  ...sharedStyles,
  articleHeadLineText: Object.assign({}, sharedStyles.articleHeadLineText, {
    fontSize: 28,
    lineHeight: 37,
    fontWeight: "400"
  }),
  standFirst: Object.assign({}, sharedStyles.standFirst, {
    lineHeight: 29
  })
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...androidStyles
});

export default styles;
