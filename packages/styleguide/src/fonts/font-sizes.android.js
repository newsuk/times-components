import sharedFontSizes from "./font-sizes-base";

const fontSizes = scale => {
  const defaultSizes = {
    ...sharedFontSizes,
    button: 14
  };
  switch (scale) {
    case "xlarge":
      return {
        ...defaultSizes,
        bodyMobile: 24
      };
    case "large":
      return {
        ...defaultSizes,
        bodyMobile: 20
      };
    default:
      return defaultSizes;
  }
};

export default fontSizes;
