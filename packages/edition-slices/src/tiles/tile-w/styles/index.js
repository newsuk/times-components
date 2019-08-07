import { fontFactory, spacing, fonts } from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

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
    width: "33.33%",
    ...fullHeightSummaryContainer
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
    paddingRight: spacing(4),
    ...fullHeightSummaryContainer
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
    width: "33.33%",
    paddingRight: spacing(4),
    ...fullHeightSummaryContainer
  }
};

const hugeStyles = {
  headline: {
    fontFamily: fonts.headline,
    fontSize: 35,
    lineHeight: 35
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
