import { editionBreakpoints, spacing } from "@times-components/styleguide";

const defaultBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4),
    paddingVertical: spacing(1)
  },
  leadContainer: {
    width: "60%"
  },
  supportContainer: {
    width: "40%"
  }
};

const wideBreakpointStyles = {
  container: {
    ...defaultBreakpointStyles.container,
    marginHorizontal: spacing(2)
  },
  leadContainer: defaultBreakpointStyles.leadContainer,
  supportContainer: defaultBreakpointStyles.supportContainer
};

const styleResolver = {
  [editionBreakpoints.small]: defaultBreakpointStyles,
  [editionBreakpoints.medium]: defaultBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => styleResolver[breakpoint];
