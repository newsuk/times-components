import {
  colours,
  editionBreakpoints,
  spacing
} from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    backgroundColor: colours.functional.darkSupplement,
    flex: 1
  },
  separator: {
    borderColor: colours.functional.tertiary
  }
};

const mediumBreakpointStyles = {
  container: {
    flexDirection: "row",
    flex: 1,
    padding: spacing(1),
    paddingTop: 0
  },
  secondaryItemContainer: {
    width: "50%"
  },
  separator: {
    borderColor: colours.functional.tertiary
  },
  supportsWrapper: {
    width: "50%"
  },
  supportContainer: {
    flex: 1,
    flexDirection: "row"
  },
  supportItem: {
    width: "50%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;
