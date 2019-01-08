import { PixelRatio } from "react-native";

import { acceptedWidths, normaliseWidth, screenWidth } from "./screen.base.js";

export { acceptedWidths, normaliseWidth, screenWidth };
export const screenWidthInPixels = () =>
  PixelRatio.getPixelSizeForLayoutSize(screenWidth());
