import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const nativeStyles = StyleSheet.create({
    articleHeadLineText: Object.assign({}, sharedStyles.articleHeadLineText, {
        fontWeight: "700",
      }),
      standFirst: Object.assign({}, sharedStyles.standFirst, {
        lineHeight: 25,
      }),
});

export default Object.assign({}, sharedStyles, nativeStyles);
