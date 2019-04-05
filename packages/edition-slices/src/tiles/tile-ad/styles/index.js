import { fonts, spacing } from "@times-components/styleguide";

const main = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20
  },
  imageContainer: {
    width: "30%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    width: "70%"
  }
};

const stylesWide = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 22
  }
};

const headlineFontSizeResolver = {
  huge: stylesWide,
  wide: stylesWide
};

export default breakpoint => ({
  ...main,
  ...(headlineFontSizeResolver[breakpoint] || {})
});
