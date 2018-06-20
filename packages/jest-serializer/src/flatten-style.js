import { StyleSheet } from "react-native-web";
import traverse from "./traverse";
import print from "./printers";

export const flattenStyleTransform = (accum, node, props, children) => {
  const { style: styles, ...other } = props;
  const flattened = StyleSheet.flatten(styles);
  const style = Object.keys(flattened || {}).length ? { style: flattened } : {};

  return {
    accum,
    node,
    props: {
      ...other,
      ...style
    },
    children
  };
};

export default traverse(print, flattenStyleTransform);
