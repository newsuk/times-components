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
    marginBottom: spacing(5),
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
    flexDirection: "column"
  },
  item: {
    paddingHorizontal: "5%"
  },
  rowItems: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "30%"
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
