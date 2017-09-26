import { StyleSheet } from "react-native";
import globalStyle from "./article-global-style";

const bodyFontFamily = "TimesDigitalW04-Regular";

const styles = {};

const articleStyle = StyleSheet.create({
  leadAsset: {
    marginBottom: 6
  },
  articleTextElement: {
    fontFamily: bodyFontFamily,
    fontStyle: "normal",
    lineHeight: 26,
    marginBottom: 20,
    fontSize: 16,
    color: "#333333"
  }
});

export default Object.assign(styles, globalStyle, articleStyle);
