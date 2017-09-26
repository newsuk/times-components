import { StyleSheet } from "react-native";
import globalStyle from "./article-global-style";

const bodyFontFamily = "TimesDigitalW04";

const styles = {};

const articleStyle = StyleSheet.create({
  leadAsset: {
    marginBottom: 10
  },
  articleTextElement: {
    fontFamily: bodyFontFamily,
    lineHeight: 26,
    fontSize: 17,
    marginBottom: 25,
    marginTop: 0,
    color: "#333"
  }
});

export default Object.assign(styles, globalStyle, articleStyle);
