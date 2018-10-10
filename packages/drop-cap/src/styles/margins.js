import { scales } from "@times-components/styleguide";

export default scale => {
  switch (scale) {
    case scales.large:
      return {
        bottom: -26,
        top: -14
      };
    case scales.xlarge:
      return {
        bottom: -22,
        top: -16
      };
    default:
      return { bottom: -30, top: -12 };
  }
};
