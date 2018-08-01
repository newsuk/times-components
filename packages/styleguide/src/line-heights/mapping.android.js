import mappingBase from "./mapping-base";

const mapping = ({scale}) => {
  switch(scale) {
    case "large":
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          secondary: 29
        }
      };
    case "xlarge":
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          secondary: 31
        }
      };
    default:
      return mappingBase;
  }
};

export default mapping;
