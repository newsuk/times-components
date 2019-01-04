import { PixelRatio } from "react-native";

import {
  acceptedWidths,
  isTablet,
  normaliseWidth,
  screenWidth,
  tabletWidth
} from "./screen.base.js";

export { acceptedWidths, isTablet, normaliseWidth, screenWidth, tabletWidth };
export const screenWidthInPixels = () =>
  PixelRatio.getPixelSizeForLayoutSize(screenWidth());
