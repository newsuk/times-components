import { StyleSheet } from "react-native-web";
import traverse from "./traverse";
import print from "./printers";

export const flattenStyleTransform = (accum, node, props, children) => {
  const { style: styles, ...other } = props;
  const flattened = StyleSheet.flatten(styles);
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
