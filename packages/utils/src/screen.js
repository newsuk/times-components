import { tabletWidth } from "@times-components/styleguide";
import getDimensions from "./dimensions-util";

export const acceptedWidths = [
  320,
  440,
  660,
  800,
  1080,
  1280,
  1440,
  1670,
  1920,
  2308
];
const { width } = getDimensions();

// We want to ensure a small number of caches that are more frequently "warm"
// so we limit the number of resolutions we will request for assets
// across devices to a common set
export const normaliseWidthForAssetRequestCache = widthInPixels => {
  const nWidth = acceptedWidths.find(w => widthInPixels <= w);

  return nWidth || acceptedWidths[acceptedWidths.length - 1];
};

export const screenWidth = isTablet => (isTablet ? tabletWidth : width);
