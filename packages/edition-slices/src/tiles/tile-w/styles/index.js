import { fontFactory, spacing, fonts } from "@times-components/styleguide";

const main = {
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingTop: spacing(3),
    paddingBottom: spacing(3)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "tileLeadHeadline"
    })
  },
  imageContainer: {
    width: "66.66%"
  },
  summaryContainer: {
    flex: 1,
    paddingBottom: spacing(1),
    paddingRight: spacing(4),
    width: "33.33%"
  }
};

const mediumStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4),
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1,
    width: "51.5%",
    paddingRight: spacing(4)
  },
  imageContainer: {
    width: "48.5%"
  }
};

const wideStyles = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35
  },
  summaryContainer: {
    flex: 1,
    width: "33.33%",
    paddingRight: spacing(4)
  }
};

const stylesResolver = {
  medium: mediumStyles,
  wide: wideStyles,
  huge: wideStyles
};

export default breakpoint => ({
  ...main,
  ...(stylesResolver[breakpoint] || {})
});
