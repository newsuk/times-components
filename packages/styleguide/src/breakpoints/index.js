const editionBreakpoints = {
  huge: "huge",
  medium: "medium",
  small: "small",
  wide: "wide"
};

const editionBreakpointWidths = [768, 1024, 1366];
const editionMaxWidth =
  editionBreakpointWidths[editionBreakpointWidths.length - 1];
const getEditionBreakpoint = width => {
  if (width < editionBreakpointWidths[0]) {
    return editionBreakpoints.small;
  }
  if (width < editionBreakpointWidths[1]) {
    return editionBreakpoints.medium;
  }
  if (width < editionBreakpointWidths[2]) {
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
export { editionBreakpoints, editionMaxWidth, getEditionBreakpoint };
