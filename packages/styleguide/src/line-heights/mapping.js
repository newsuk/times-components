import mappingBase from "./mapping-base";

const mapping = ({scale}) => {
  switch(scale) {
    case "large":
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 31,
          secondary: 31
        }
      };
    case "xlarge":
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
