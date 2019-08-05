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
    width: "51.5%",
    paddingRight: spacing(4)
  },
  imageContainer: {
    width: "48.5%"
  },
  star: {
    starButton: {
      position: "absolute",
      right: -spacing(1),
      bottom: -spacing(1)
    }
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
