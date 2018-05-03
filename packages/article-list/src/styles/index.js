import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  ...sharedStyles,
  ArticleListBody: {
    ...sharedStyles.ArticleListBody,
    color: "red"
  }
});

export default webStyles;
