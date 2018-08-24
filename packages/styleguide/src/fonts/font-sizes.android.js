import scales from "../scales";
import sharedFontSizes from "./font-sizes-base";

const fontSizes = scale => {
  const defaultSizes = {
    ...sharedFontSizes,
    button: 14
  };
  switch (scale) {
    case scales.large:
      return {
        ...defaultSizes,
        bodyMobile: 21,
        button: 15,
        cardMetaMobile: 17,
        link: 14,
        secondary: 21
      };
    case scales.xlarge:
      return {
        ...defaultSizes,
        bodyMobile: 23,
        button: 16,
        cardMetaMobile: 19,
        link: 15,
        secondary: 23
      };
    default:
      return defaultSizes;
  }
};

export default fontSizes;
