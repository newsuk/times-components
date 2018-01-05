import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import globalStyle from "../shared";

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
