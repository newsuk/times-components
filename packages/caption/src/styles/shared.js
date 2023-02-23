import {
  colours,
  fontFactory,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";

const styles = {
  container: {
    paddingTop: spacing(2)
  },
  credits: {
    color: colours.functional.primary,
    fontSize: fontSizes.credits,
    fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 16
  },
  text: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "caption"
    })
  }
};

export default styles;
