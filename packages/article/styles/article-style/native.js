import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const nativeStyles = StyleSheet.create({
    articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
        fontStyle: "normal",
        marginBottom: 20,
      })
});

export default Object.assign({}, sharedStyles, nativeStyles);

