import traverse from "./traverse";
import print from "./printers";

export const propsNoChildren = (node, props) => ({
  children: [],
  node,
  props
});

export const justChildren = (node, props, children) => ({
  children
});

export const meltNative = {
  Text: justChildren,
  View: justChildren
};

export const replaceTransform = config => (accum, node, props, children) => {
  if (config[node.type] === undefined) {
    return {
      accum,
      children,
      node,
      props
    };
  }

  if (!config[node.type]) {
    return {
      accum,
      node: null
    };
  }

  const { node: tNode, props: tProps, children: tChildren } = config[node.type](
    node,
    props,
    children
  );

  return {
    accum,
    children: tChildren,
    node: tNode,
    props: tProps
  };
};

export default config => traverse(print, replaceTransform(config));
