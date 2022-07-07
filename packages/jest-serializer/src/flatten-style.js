import traverse from "./traverse";
import print from "./printers";

export const flattenStyleTransform = (accum, node, props, children) => {
  const { style: styles, ...other } = props;

  return {
    accum,
    children,
    node,
    props: {
      ...other
    }
  };
};

export default traverse(print, flattenStyleTransform);
