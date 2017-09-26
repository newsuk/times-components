import { StyleSheet } from "react-native";
import globalStyle from "./article-global-style";

const standFirstFontFamily = "TimesModern-Regular";

const headerStyles = {};

const styles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 25,
    color: "#333333",
    fontFamily: standFirstFontFamily,
    paddingBottom: 9
  }
});

export default Object.assign(headerStyles, globalStyle, styles);
