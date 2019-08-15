import { fonts, spacing, colours } from "@times-components/styleguide";

const styles = {
  container: {
    backgroundColor: colours.functional.darkSupplement,
    paddingHorizontal: 12,
    paddingVertical: spacing(2)
  },
  flagColour: {
    color: colours.functional.greyLabel
  },
  headlineStyle: {
    color: colours.functional.white,
    fontFamily: fonts.headline,
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 11,
    marginTop: spacing(1)
  }
};

export default styles;
