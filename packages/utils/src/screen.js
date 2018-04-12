import { Dimensions, PixelRatio } from "react-native";

export { normaliseWidth } from "./screen.base.js";

export const screenWidth = () => Dimensions.get("window").width;

export const screenWidthInPixels = () =>
  PixelRatio.getPixelSizeForLayoutSize(screenWidth());
