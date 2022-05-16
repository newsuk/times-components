import { editionBreakpoints } from "@times-components/ts-styleguide";

const wideBreakpointHeadlineStyles = {
  fontSize: 20,
  lineHeight: 20
};

const hugeBreakpointHeadlineStyles = {
  fontSize: 22,
  lineHeight: 22
};

const styleResolver = {
  [editionBreakpoints.wide]: wideBreakpointHeadlineStyles,
  [editionBreakpoints.huge]: hugeBreakpointHeadlineStyles
};
export default breakpoint => styleResolver[breakpoint];
