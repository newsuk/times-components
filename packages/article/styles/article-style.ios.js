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
    fontStyle: "normal",
    lineHeight: 26,
    marginBottom: 20,
    fontSize: 17,
    color: "#333333"
  }
});

export default Object.assign(styles, globalStyle, articleStyle);
