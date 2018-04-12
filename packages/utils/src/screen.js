import { Dimensions, PixelRatio } from "react-native";

const acceptedWidths = [320, 440, 660, 800, 1440];

export const normaliseWidth = width => {
  const nWidth = acceptedWidths.find(w => width <= w);

  return nWidth || acceptedWidths[acceptedWidths.length - 1];
};

export const screenWidth = () => Dimensions.get("window").width;

export const screenWidthInPixels = () =>
  PixelRatio.getPixelSizeForLayoutSize(screenWidth());
