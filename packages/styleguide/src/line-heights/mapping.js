import scales from "../scales";
import mappingBase from "./mapping-base";
import fonSizeFactory from "../fonts/font-sizes";

const mapping = ({ scale }) => {
  const fontSizes = fonSizeFactory(scale);
  switch (scale) {
    case scales.large:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: Math.round(fontSizes.bodyMobile * 1.44),
          secondary: Math.round(fontSizes.secondary * 1.44)
        },
        supporting: {
          button: 17,
          keyFactsTitle: 20,
          link: 16
        },
        headline: {
          ...mappingBase.headline,
          headline: 36
        }
      };
    case scales.xlarge:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: Math.round(fontSizes.bodyMobile * 1.44),
          secondary: Math.round(fontSizes.secondary * 1.44)
        },
        supporting: {
          button: 18,
          keyFactsTitle: 22,
          link: 17
        },
        headline: {
          ...mappingBase.headline,
          headline: 36
        }
      };
    default:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: Math.round(fontSizes.bodyMobile * 1.44)
        },
        headline: {
          ...mappingBase.headline,
          headline: 36
        }
      };
  }
};

export default mapping;
