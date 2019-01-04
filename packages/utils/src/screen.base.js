import { Dimensions } from "react-native";

export const acceptedWidths = [320, 440, 660, 800, 1080, 1440];

export const normaliseWidth = width => {
  const nWidth = acceptedWidths.find(w => width <= w);

  return nWidth || acceptedWidths[acceptedWidths.length - 1];
};

export const screenWidth = () => Dimensions.get("window").width;

export const tabletWidth = 660;

export const isTablet = () => screenWidth() > tabletWidth;
