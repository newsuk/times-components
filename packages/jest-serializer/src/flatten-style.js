import traverse from "./traverse";
import print from "./printers";
import flatten from "lodash.flatten";

export const flattenStyleTransform = (accum, node, props, children) => {
  const { style: styles, ...other } = props;
  const flattened = flatten(styles);
  const style = Object.keys(flattened || {}).length ? { style: flattened } : {};

  return {
    accum,
    children,
    node,
    props: {
      ...other,
      ...style
    }
  };
};

export default traverse(print, flattenStyleTransform);
