import { StyleSheet, Platform } from "react-native";
import globalStyle from "./article-global-style";

const fontFamily = "TimesDigitalW04";

const styles = {};

const webStyles = StyleSheet.create({
  leadAsset: {
    marginBottom: 10
  },
  articleTextElement: {
    fontFamily,
    lineHeight: 26,
    fontSize: 17,
    marginBottom: 25,
    marginTop: 0,
    color: "#333"
  }
});

const nativeStyles = StyleSheet.create({
  leadAsset: {
    marginBottom: Platform.OS === "android" ? 6 : 10
  },
  articleTextElement: {
    fontFamily,
    lineHeight: 26,
    marginBottom: 20,
    fontSize: Platform.OS === "android" ? 16 : 17,
    color: "#333333"
  }
});

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
