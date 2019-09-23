import { editionBreakpoints, spacing } from "@times-components/styleguide";

const wideBreakpointHeadlineStyles = {
  fontSize: 20,
  lineHeight: 20,
  marginBottom: spacing(1)
};

const hugeBreakpointHeadlineStyles = {
  fontSize: 22,
  lineHeight: 22,
  marginBottom: spacing(1)
};

const styleResolver = {
  [editionBreakpoints.wide]: wideBreakpointHeadlineStyles,
  [editionBreakpoints.huge]: hugeBreakpointHeadlineStyles
};
export default breakpoint => styleResolver[breakpoint];
