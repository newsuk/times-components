import { StyleSheet } from "react-native";
import sharedStyles from "./shared";
import { FONT_FAMILY_BODY } from "../const";

const androidStyles = StyleSheet.create({
    leadAsset: Object.assign({}, sharedStyles.leadAsset, {
        marginBottom: 6
    }),
    articleTextElement: Object.assign({}, sharedStyles.articleTextElement, {
        fontFamily: FONT_FAMILY_BODY,
        fontSize: 16,
        fontStyle: "normal",
        marginBottom: 20,
    }),
});

export default Object.assign({}, sharedStyles, androidStyles);
