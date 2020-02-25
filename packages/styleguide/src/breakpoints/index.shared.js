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
const sliceContentMaxWidth = 1180;

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
  editionBreakpointWidths,
  sliceContentMaxWidth
};
