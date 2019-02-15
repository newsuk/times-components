import { fonts, spacing, colours } from "@times-components/styleguide";

const styles = {
  container: {
    backgroundColor: colours.functional.darkSupplement,
    paddingHorizontal: 12,
    paddingVertical: spacing(2)
  },
  headlineStyle: {
    color: colours.functional.white,
    fontFamily: fonts.headline,
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 11,
    marginTop: spacing(1)
  }
};

export default styles;
