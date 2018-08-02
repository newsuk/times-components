import mappingBase from "./mapping-base";

const mapping = ({ scale }) => {
  switch (scale) {
    case "large":
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 29,
          secondary: 29
        }
      };
    case "xlarge":
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
