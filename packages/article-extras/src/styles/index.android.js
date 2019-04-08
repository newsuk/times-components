import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  ArticleExtrasBody: {
    ...sharedStyles.ArticleExtrasBody,
    color: "green"
  }
});

export default styles;
