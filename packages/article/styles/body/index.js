import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import globalStyle from "../article-global-style";

const webStyles = {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginTop: 0
  }
};

const styles = StyleSheet.create({
  ...globalStyle,
  ...webStyles
});

export default styles;
