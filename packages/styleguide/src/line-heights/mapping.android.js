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
          link: 14
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
          link: 15
        }
      };
    default:
      return mappingBase;
  }
};

export default mapping;
