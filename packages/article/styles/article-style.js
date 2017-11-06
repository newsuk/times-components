import { StyleSheet, Platform } from "react-native";
import globalStyle from "./article-global-style";
import extendedStyles from './article-style-extension';
import { FONT_FAMILY_BODY, COLOUR_TEXT } from './const/article-const';

const styles = {};

const webStyles = StyleSheet.create({
  leadAsset: {
    marginBottom: 10
  },
  articleTextElement: {
    fontFamily: FONT_FAMILY_BODY,
    lineHeight: 26,
    fontSize: 17,
    marginBottom: 25,
    marginTop: 0,
    color: COLOUR_TEXT
  }
});

const nativeStyles = StyleSheet.create({
  leadAsset: {
    marginBottom: 10
  },
  articleTextElement: {
    fontFamily: FONT_FAMILY_BODY,
    fontStyle: "normal",
    lineHeight: 26,
    marginBottom: 20,
    fontSize: 17,
    color: COLOUR_TEXT
  }
});

if (Platform.OS !== "web") {
  Object.assign(styles, globalStyle, nativeStyles, extendedStyles);
} else {
  Object.assign(styles, globalStyle, webStyles);
}

export default styles;
