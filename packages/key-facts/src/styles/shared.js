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
    marginBottom: spacing(4)
  },
  italic: {
    fontStyle: "italic"
  },
  text: {
    color: colours.functional.primary,
    fontFamily: fonts.body,
    fontSize: fontSizes.secondary,
    lineHeight: 30,
    marginTop: -5,
    paddingLeft: spacing(3)
  }
};

export default sharedStyle;
