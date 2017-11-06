import { StyleSheet, Platform } from "react-native";
import globalStyle from "./article-global-style";
import { COLOUR_HEADLINE, COLOUR_TEXT } from "./const";

const standFirstFontFamily = "TimesModern-Regular";

const styles = {};

const webStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: COLOUR_HEADLINE,
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 26,
    fontFamily: standFirstFontFamily,
    color: COLOUR_TEXT,
    paddingBottom: 9
  }
});

export const nativeStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: Platform.OS === "android" ? 28 : 30,
    lineHeight: Platform.OS === "android" ? 37 : 32,
    color: COLOUR_HEADLINE,
    fontWeight: Platform.OS === "android" ? "400" : "700",
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: Platform.OS === "android" ? 29 : 25,
    color: COLOUR_TEXT,
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
