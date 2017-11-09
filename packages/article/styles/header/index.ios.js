import { StyleSheet } from "react-native";
import globalStyle from "../shared";
import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  articleHeadLineText: Object.assign({}, sharedStyles.articleHeadLineText, {
    fontWeight: "700"
  }),
  standFirst: Object.assign({}, sharedStyles.standFirst, {
    lineHeight: 25
  })
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...nativeStyles
});

export default styles;
