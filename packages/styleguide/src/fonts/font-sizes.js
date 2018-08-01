import sharedFontSizes from "./font-sizes-base";

const fontSizes = scale => {
  switch (scale) {
    case "large":
      return {
        ...sharedFontSizes,
        bodyMobile: 21,
        cardMetaMobile: 17,
        secondary: 20
      };
    case "xlarge":
      return {
        ...sharedFontSizes,
        bodyMobile: 23,
        cardMetaMobile: 18,
        secondary: 22
      };
    default:
      return sharedFontSizes;
  }
}

export default fontSizes;
