import { scales } from "@times-components/context";
import mappingBase from "./mapping-base";

const mapping = ({ scale }) => {
  switch (scale) {
    case scale.large:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 31,
          secondary: 31
        }
      };
    case scales.xlarge:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 33,
          secondary: 33
        }
      };
    default:
      return mappingBase;
  }
};

export default mapping;
