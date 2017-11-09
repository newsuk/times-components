import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import globalStyle from "../article-global-style";

const nativeStyles = {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginBottom: 20
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...nativeStyles
});

export default styles;
