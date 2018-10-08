import { StyleSheet } from "react-native";
import sharedStylesFactory from "./shared";

const sharedStyles = sharedStylesFactory();

export default StyleSheet.create({
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginTop: 0
  }
});
