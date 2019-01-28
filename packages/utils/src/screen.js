import { PixelRatio } from "react-native";

import { acceptedWidths, normaliseWidth, screenWidth } from "./screen.base.js";

export { acceptedWidths, normaliseWidth, screenWidth };

export const convertToPixels = points =>
  PixelRatio.getPixelSizeForLayoutSize(points);

export const screenWidthInPixels = () => convertToPixels(screenWidth());
