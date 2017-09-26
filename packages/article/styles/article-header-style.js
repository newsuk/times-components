import { StyleSheet, Platform } from "react-native";
import globalStyle from "./article-global-style";

const standFirstFontFamily = "TimesModern-Regular";

const styles = {};

const webStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: 30,
    lineHeight: 32,
    color: "#000000",
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: 26,
    fontFamily: standFirstFontFamily,
    color: "#333333",
    paddingBottom: 9
  }
});

const nativeStyles = StyleSheet.create({
  articleHeadLineText: {
    fontSize: Platform.OS === "android" ? 28 : 30,
    lineHeight: Platform.OS === "android" ? 37 : 32,
    color: "#000000",
    fontWeight: Platform.OS === "android" ? "400" : "700",
    marginBottom: 7
  },
  standFirst: {
    fontSize: 21,
    lineHeight: Platform.OS === "android" ? 29 : 25,
    color: "#333333",
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
