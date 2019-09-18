import { editionBreakpoints, spacing } from "@times-components/styleguide";

const defaultBreakpointStyles = {
  cartoon: {
    width: "66.7%"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(1)
  },
  lead: {
    width: "33.3%"
  }
};

const wideBreakpointStyles = {
  ...defaultBreakpointStyles,
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1)
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: defaultBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];
