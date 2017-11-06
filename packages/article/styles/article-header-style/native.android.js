import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const androidStyles = StyleSheet.create({
    articleHeadLineText: Object.assign({}, sharedStyles.articleHeadLineText, {
        fontSize: 28,
        lineHeight: 37,
        fontWeight: "400",
      }),
      standFirst: Object.assign({}, sharedStyles.standFirst, {
        lineHeight: 29,
      }),
});

export default Object.assign({}, sharedStyles, androidStyles);
