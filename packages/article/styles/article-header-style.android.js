import { StyleSheet } from "react-native";
import globalStyle from "./article-global-style";

const standFirstFontFamily = "TimesModern-Regular";

const headerStyles = {};

const styles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 28,
    lineHeight: 37,
    color: "#000000",
    fontWeight: "400",
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 29,
    color: "#333333",
    fontFamily: standFirstFontFamily,
    paddingBottom: 9
  }
});

export default Object.assign(headerStyles, globalStyle, styles);
