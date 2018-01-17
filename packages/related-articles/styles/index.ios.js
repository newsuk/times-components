import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  RelatedArticlesBody: {
    ...sharedStyles.RelatedArticlesBody,
    color: "blue"
  }
});

export default webStyles;
