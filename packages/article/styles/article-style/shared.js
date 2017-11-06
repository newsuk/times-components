import { StyleSheet } from "react-native";
import { FONT_FAMILY_BODY, COLOUR_TEXT } from "../const";

const sharedStyles = StyleSheet.create({
    leadAsset: {
        marginBottom: 10
    },
    articleTextElement: {
        fontFamily: FONT_FAMILY_BODY,
        lineHeight: 26,
        fontSize: 17,
        marginBottom: 25,
        color: COLOUR_TEXT
    }
});

export default sharedStyles;