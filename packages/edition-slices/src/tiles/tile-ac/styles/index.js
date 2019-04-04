import { colours, fonts, spacing } from "@times-components/styleguide";

const main = {
  container: {
    flex: 1
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: spacing(2),
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(4)
  }
};

const stylesWide = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35,
    marginBottom: spacing(2),
    textAlign: "center"
  }
};

const stylesResolver = {
  huge: stylesWide,
  wide: stylesWide
};

export default breakpoint => ({
  ...main,
  ...(stylesResolver[breakpoint] || {})
});
