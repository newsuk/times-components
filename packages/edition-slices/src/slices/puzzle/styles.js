import {
  editionBreakpoints,
  spacing,
  colours
} from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2)
  },
  header: {
    paddingHorizontal: spacing(3),
    paddingTop: spacing(3),
    width: "85%"
  },
  headLine: {
    fontSize: 25
  },
  imageContainer: {
    alignSelf: "flex-end",
    width: "85%"
  },
  link: {
    flex: 1
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginTop: spacing(2)
  }
};

const mediumBreakpointStyles = {
  ...smallBreakpointStyles,
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacing(3),
    paddingTop: spacing(2)
  },
  headLine: {
    fontSize: 22
  },
  puzzleContainer: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginHorizontal: spacing(1)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;
