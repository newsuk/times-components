import {fonts, spacing } from "@times-components/styleguide";

const styles = {
    container: {
        paddingBottom: spacing(1),
        paddingTop: spacing(4),
        textAlign: 'center'
    },
    keySeperator: {
        borderColor: "#dcdcdc",
        borderBottomWidth: 1,
        borderStyle: "solid",
        marginHorizontal: 10
    },
    leadTextContainer: {
        paddingTop: spacing(2),
        paddingBottom: spacing(1),
    },
    leadText: {
        fontSize:16,
        fontFamily: fonts.bodyRegular,
        color: "#850029",
        lineHeight: spacing(3)
    }
};

export default styles;