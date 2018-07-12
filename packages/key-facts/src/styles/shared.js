import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const sharedStyle = {
  bullet: {
    backgroundColor: colours.functional.bullet,
    height: 8,
    top: 6,
    transform: [{ rotate: "45deg" }],
    width: 8
  },
  container: {
    flexDirection: "row",
    marginBottom: spacing(4),
    paddingLeft: 1,
    width: "100%"
  },
  text: {
    color: colours.functional.primary,
    fontFamily: fonts.body,
    fontSize: fontSizes.secondary,
    lineHeight: 30,
    marginTop: -5,
    paddingLeft: spacing(3)
  },
  title: {
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMetaMobile,
    fontWeight: "400",
    letterSpacing: 1.2,
    marginBottom: 20
  }
};

export default sharedStyle;
