import {
    StyleSheet,
    Platform
} from "react-native";
import globalStyle from "./article-global-style";

const borderColor = "#d0cece";
const borderWidth = StyleSheet.hairlineWidth;

const metaStyle = {};

const customStyle = Platform.select({
    ios: {
        paddingTop: 9,
        paddingBottom: 4
    },
    android: {
        paddingTop: 6,
        paddingBottom: 8
    },
    web: {
        paddingTop: 9,
        paddingBottom: 5
    }
});

const styles = StyleSheet.create({
    articleMetaElement: {
        borderTopColor: borderColor,
        borderTopWidth: borderWidth,
        ...customStyle
    },
});

export default Object.assign(metaStyle, styles, globalStyle);;