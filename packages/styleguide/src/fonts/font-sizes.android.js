import sharedFontSizes from "./font-sizes-base";

const fontSizes = scale => {
  const defaultSizes = {
    ...sharedFontSizes,
    button: 14
  };
  switch (scale) {
    case "large":
      return {
        ...defaultSizes,
        bodyMobile: 19,
        cardMetaMobile: 15,
        secondary: 18
      };
    case "xlarge":
      return {
        ...defaultSizes,
        bodyMobile: 21,
        cardMetaMobile: 27,
        secondary: 20
      };
    default:
      return defaultSizes;
  }
};

export default fontSizes;
