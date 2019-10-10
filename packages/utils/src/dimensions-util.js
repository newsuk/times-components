import { Dimensions } from "react-native";

export const getDimensions = (
  width = Dimensions.get("window").width,
  height = Dimensions.get("window").height,
  fontScale = Dimensions.get("window").fontScale
) => ({ width, height, fontScale });

export const addDimensionsListener = (type, handler) => {
  Dimensions.addEventListener(type, handler);
};

export const removeDimensionsListener = (type, handler) => {
  Dimensions.removeEventListener(type, handler);
};
