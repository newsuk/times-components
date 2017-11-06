import { StyleSheet, Platform } from "react-native";
import globalStyle from "./article-global-style";
import { COLOUR_HEADLINE, COLOUR_TEXT } from './const/article-const';

const standFirstFontFamily = "TimesModern-Regular";

const styles = {};

const webStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: COLOUR_TEXT,
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 26,
    fontFamily: standFirstFontFamily,
    color: COLOUR_HEADLINE,
    paddingBottom: 9
  }
});

export const nativeStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: Platform.OS === "android" ? 28 : 30,
    lineHeight: Platform.OS === "android" ? 37 : 32,
    color: COLOUR_TEXT,
    fontWeight: Platform.OS === "android" ? "400" : "700",
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: Platform.OS === "android" ? 29 : 25,
    color: COLOUR_HEADLINE,
    fontFamily: standFirstFontFamily,
    paddingBottom: 9
  }
});

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
