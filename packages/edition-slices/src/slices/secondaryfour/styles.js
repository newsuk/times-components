import { editionBreakpoints, spacing } from "@times-components/styleguide";

const wideBreakpointStyles = {
  fontSize: 20,
  lineHeight: 20,
  marginBottom: spacing(1)
};

export default breakpoint =>
  breakpoint === editionBreakpoints.wide ? wideBreakpointStyles : {};
