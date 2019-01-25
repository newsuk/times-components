import { PixelRatio } from "react-native";

import { acceptedWidths, normaliseWidth, screenWidth } from "./screen.base.js";

export { acceptedWidths, normaliseWidth, screenWidth };

export const convertToPixels = px => PixelRatio.getPixelSizeForLayoutSize(px);

export const screenWidthInPixels = () =>
  convertToPixels(screenWidth());
