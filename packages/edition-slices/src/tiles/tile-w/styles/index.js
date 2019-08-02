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
    paddingBottom: spacing(1),
    paddingRight: spacing(4),
    width: "33.33%"
  },
  star: {
    alignItems: "flex-start",
    flex: 1,
    marginTop: spacing(-1),
    marginLeft: spacing(5),
    width: "75%"
  }
};

const mediumStyles = {
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    marginHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30
  }
};

const wideStyles = {
  star: {
    alignItems: "flex-start",
    flex: 1,
    marginTop: spacing(-1),
    width: "72%"
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35
  }
};

const hugeStyles = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35
  },
  star: {
    alignItems: "flex-start",
    flex: 1,
    marginTop: spacing(-1),
    width: "72%"
  }
};

const stylesResolver = {
  medium: mediumStyles,
  wide: wideStyles,
  huge: hugeStyles
};

export default breakpoint => ({
  ...main,
  ...(stylesResolver[breakpoint] || {})
});
