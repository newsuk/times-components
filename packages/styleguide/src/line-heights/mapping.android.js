import scales from "../scales";
import mappingBase from "./mapping-base";

const mapping = ({ scale }) => {
  switch (scale) {
    case scales.large:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 29,
          secondary: 29
        }
      };
    case scales.xlarge:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 31,
          secondary: 31
        }
      };
    default:
      return mappingBase;
  }
};

export default mapping;
