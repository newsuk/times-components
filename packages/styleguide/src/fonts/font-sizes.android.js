import scales from "../scales";
import sharedFontSizes from "./font-sizes-base";

const fontSizes = scale => {
  switch (scale) {
    case scales.large:
      return {
        ...sharedFontSizes,
        bodyMobile: 21,
        button: 15,
        cardMetaMobile: 17,
        keyFactsTitle: 17,
        link: 14,
        secondary: 21
      };
    case scales.xlarge:
      return {
        ...sharedFontSizes,
        bodyMobile: 23,
        button: 16,
        cardMetaMobile: 19,
        keyFactsTitle: 19,
        link: 15,
        secondary: 23
      };
    default:
      return sharedFontSizes;
  }
};

export default fontSizes;
