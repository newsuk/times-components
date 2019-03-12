import {
  colours,
  spacing,
  fonts,
  fontSizes,
  editionBreakpoints
} from "@times-components/styleguide";

const smallBreakpointStyles = {
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
    marginVertical: spacing(5)
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

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : { ...smallBreakpointStyles, ...mediumBreakpointStyles };
