import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const webStyles = StyleSheet.create({
  articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
    marginTop: 0
  })
});

export default Object.assign({}, sharedStyles, webStyles);
