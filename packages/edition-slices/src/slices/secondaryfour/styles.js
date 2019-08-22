import { editionBreakpoints } from "@times-components/styleguide";

const wideBreakpointStyles = {
  fontSize: 20,
  lineHeight: 20
};

export default breakpoint =>
  breakpoint === editionBreakpoints.wide ? wideBreakpointStyles : {};
