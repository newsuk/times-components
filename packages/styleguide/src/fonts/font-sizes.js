import { scales } from "@times-components/context";
import sharedFontSizes from "./font-sizes-base";

const fontSizes = scale => {
  switch (scale) {
    case scales.large:
      return {
        ...sharedFontSizes,
        bodyMobile: 21,
        cardMetaMobile: 17,
        secondary: 21
      };
    case scales.xlarge:
      return {
        ...sharedFontSizes,
        bodyMobile: 23,
        cardMetaMobile: 19,
        secondary: 23
      };
    default:
      return sharedFontSizes;
  }
};

export default fontSizes;
