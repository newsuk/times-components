import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  ArticleMainStandardBody: {
    ...sharedStyles.ArticleMainStandardBody,
    color: "green"
  }
});

export default styles;
