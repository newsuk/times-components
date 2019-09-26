import {
  colours,
  spacing,
  fonts,
  fontSizes
} from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colours.functional.border,
    padding: spacing(2)
  },
  imageWrapper: {
    width: 60,
    height: 45
  },
  mastheadLogo: {
    width: 285,
    height: 73,
    marginVertical: spacing(2)
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

const mediumBreakpointStyles = {
  container: {
    ...smallBreakpointStyles.container,
    marginHorizontal: spacing(6),
    marginVertical: spacing(3),
    padding: spacing(3)
  },
  column: {
    flex: 1
  },
  itemsContainer: {
    flex: 1,
    flexDirection: "row"
  },
  colSeparator: {
    marginVertical: spacing(3)
  },
  rowSeparator: {
    marginHorizontal: spacing(3)
  },
  mastheadLogo: {
    width: 237,
    height: 60,
    marginBottom: spacing(2),
    marginTop: spacing(3)
  },
  imageWrapper: {
    width: 60,
    height: 45,
    marginRight: spacing(2)
  },
  title: {
    ...smallBreakpointStyles.title,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: spacing(3)
  }
};

const wideBreakpointStyle = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    marginHorizontal: spacing(4)
  },
  imageWrapper: {
    ...mediumBreakpointStyles.imageWrapper,
    marginRight: spacing(3)
  }
};

const stylesResolver = {
  small: smallBreakpointStyles,
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyle,
  huge: wideBreakpointStyle
};

export default breakpoint => stylesResolver[breakpoint];
