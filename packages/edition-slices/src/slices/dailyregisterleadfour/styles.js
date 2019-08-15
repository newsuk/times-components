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
    flex: 1,
    alignItems: "center",
    backgroundColor: colours.functional.border,
    marginHorizontal: spacing(6),
    marginVertical: spacing(3),
    padding: spacing(3)
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    flex: 1
  },
  colSeparator: {
    marginVertical: spacing(3)
  },
  rowSeparator: {
    marginHorizontal: spacing(3)
  },
  mastheadLogo: {
    height: 60,
    width: 237,
    marginVertical: spacing(2),
    marginTop: spacing(3)
  },
  imageWrapper: {
    height: 45,
    width: 60,
    marginRight: spacing(2)
  },
  title: {
    ...main.title,
    marginBottom: spacing(3)
  }
};

const wideBreakpointStyle = {
  container: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    paddingHorizontal: "25%",
    paddingVertical: spacing(2)
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
    backgroundColor: colours.functional.border,
    flex: 1
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

export const backgroundColour = {
  backgroundColor: main.container.backgroundColor
};
