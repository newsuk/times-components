import styleguide, {
  colours,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const { fontFactory } = styleguide();
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
    ...fontFactory({
      font: "supporting",
      fontSize: "caption"
    })
  }
};

export default styles;
