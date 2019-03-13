const editionBreakpoints = {
  huge: "huge",
  medium: "medium",
  small: "small",
  wide: "wide"
};

const editionBreakpointWidths = {
  huge: 1366,
  medium: 768,
  wide: 1024
};
const editionMaxWidth = editionBreakpointWidths.huge;

const getEditionBreakpoint = width => {
  if (width < editionBreakpointWidths.medium) {
    return editionBreakpoints.small;
  }
  if (width < editionBreakpointWidths.wide) {
    return editionBreakpoints.medium;
  }
  if (width < editionBreakpointWidths.huge) {
    return editionBreakpoints.wide;
  }
  return editionBreakpoints.huge;
};

export default {
  huge: 1320,
  medium: 768,
  nativeTablet: 660,
  nativeTabletWide: 1194,
  small: 520,
  wide: 1024
};
export {
  editionBreakpoints,
  editionMaxWidth,
  getEditionBreakpoint,
  editionBreakpointWidths
};
