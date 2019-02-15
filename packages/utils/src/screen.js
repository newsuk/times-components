import { PixelRatio } from "react-native";

import {
  acceptedWidths,
  normaliseWidthForAssetRequestCache,
  screenWidth
} from "./screen.base.js";

export { acceptedWidths, normaliseWidthForAssetRequestCache, screenWidth };

export const convertToPixels = points =>
  PixelRatio.getPixelSizeForLayoutSize(points);

export const screenWidthInPixels = () => convertToPixels(screenWidth());
