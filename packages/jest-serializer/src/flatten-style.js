import { StyleSheet } from "react-native-web";

export default (accum, node) => {
  const { style: styles, ...other } = node.props;
  const flattened = StyleSheet.flatten(styles);
  const style = Object.keys(flattened || {}).length ? { style: flattened } : {};

  return {
    accum,
    props: {
      ...other,
      ...style
    }
  };
};
