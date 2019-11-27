import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    })
  },
  imageContainer: {
    width: "50%"
  },
  summaryContainer: {
    paddingLeft: spacing(2),
    paddingBottom: spacing(1)
  }
};

const mediumBreakpointStyles = {
  container: {
    padding: spacing(2),
    paddingTop: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  }
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    ...wideBreakpointStyles.headline,
    fontSize: 22,
    lineHeight: 22
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: styles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];
