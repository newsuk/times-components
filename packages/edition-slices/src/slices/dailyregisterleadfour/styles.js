import {
  colours,
  spacing,
  fonts,
  fontSizes
} from "@times-components/styleguide";

const main = {
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    padding: spacing(2)
  },
  imageWrapper: {
    height: 45,
    width: 60
  },
  mastheadLogo: {
    height: 73,
    marginVertical: spacing(2),
    width: 285
  },
  separator: {
    borderBottomColor: colours.functional.keyline,
    marginVertical: spacing(5),
    width: "100%"
  },
  title: {
    color: colours.section.comment,
    fontFamily: fonts.body,
    fontSize: fontSizes.secondary,
    marginBottom: spacing(5)
  }
};

const smallBreakpointStyles = {
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    padding: spacing(2)
  }
};

const mediumBreakpointStyles = {
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    paddingHorizontal: "20%"
  },
  mastheadLogo: {
    height: 97,
    width: 380
  }
};

const wideBreakpointStyle = {
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    paddingHorizontal: "25%"
  }
};

const hugeBreakpointStyle = {
  columnItems: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: spacing(5)
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    width: "86%"
  },
  rowItems: {
    flexDirection: "row",
    paddingHorizontal: "8%",
    width: "100%"
  }
};

const stylesResolver = {
  huge: hugeBreakpointStyle,
  medium: mediumBreakpointStyles,
  small: smallBreakpointStyles,
  wide: wideBreakpointStyle
};

export default breakpoint => ({
  ...main,
  ...(stylesResolver[breakpoint] || {})
});
