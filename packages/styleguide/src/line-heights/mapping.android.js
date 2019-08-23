import scales from "../scales";
import mappingBase from "./mapping-base";

const mapping = ({ scale }) => {
  switch (scale) {
    case scales.large:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 31,
          secondary: 31
        },
        supporting: {
          button: 17,
          keyFactsTitle: 20,
          link: 14
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
          bodyMobile: 33,
          secondary: 33
        },
        supporting: {
          button: 18,
          keyFactsTitle: 22,
          link: 15
        },
        headline: {
          ...mappingBase.headline,
          headline: 36
        }
      };
    default:
      return {
        ...mappingBase,
        headline: {
          ...mappingBase.headline,
          headline: 36
        }
      };
  }
};

export default mapping;
