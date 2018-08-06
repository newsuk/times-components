import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = {
  container: {
    paddingTop: spacing(2)
  },
  credits: {
    color: colours.functional.primary,
    fontSize: fontSizes.credits,
    fontWeight: "400",
    letterSpacing: 1,
    lineHeight: 16
  },
  text: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.caption,
    lineHeight: 16
  }
};

export default styles;
