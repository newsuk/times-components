const nativeEditionBreakpoints = {
  large: "large",
  medium: "medium",
  small: "small",
  xlarge: "xlarge"
};

const getEditionBreakpoint = width => {
  if (width < 768) {
    return nativeEditionBreakpoints.small;
  }
  if (width < 1024) {
    return nativeEditionBreakpoints.medium;
  }
  if (width < 1366) {
    return nativeEditionBreakpoints.large;
  }
  return nativeEditionBreakpoints.xlarge;
};

export default {
  huge: 1320,
  medium: 768,
  nativeTablet: 660,
  nativeTabletWide: 1180,
  small: 520,
  wide: 1024
};
export { getEditionBreakpoint, nativeEditionBreakpoints };
