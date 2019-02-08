import { fonts, spacing } from "@times-components/styleguide";

const styles = {
    container: {
        paddingBottom: spacing(2),
        textAlign: 'center',
        paddingHorizontal: 40
    },
    headlineStyle: {
        fontFamily: fonts.headline,
        fontSize: 22,
        lineHeight: 22,
        marginBottom: spacing(1),
        marginTop: spacing(4)
    },
    straplineStyle: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.bodyRegular,
    }
}

export default styles;