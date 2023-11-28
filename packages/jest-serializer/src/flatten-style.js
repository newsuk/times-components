import traverse from "./traverse";
import print from "./printers";

export const flattenStyleTransform = (accum, node, props, children) => {
  const { style: styles, ...other } = props;
  const style = props.style; // eslint-disable-line prefer-destructuring

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
