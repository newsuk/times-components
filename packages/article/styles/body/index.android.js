import { StyleSheet } from 'react-native';
import sharedStyles from "./shared";
import globalStyle from "../article-global-style";

const androidStyles = {
  ...sharedStyles,
  leadAsset: {
    marginBottom: 6
  },
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    fontFamily: "TimesDigitalW04",
    fontSize: 16,
    fontStyle: "normal",
    marginBottom: 20
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...androidStyles
});

export default styles;
