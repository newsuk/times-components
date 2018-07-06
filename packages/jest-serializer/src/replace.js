import traverse from "./traverse";
import print from "./printers";

export const propsNoChildren = (node, props) => ({ node, props, children: [] });

export const justChildren = (node, props, children) => ({
  children
});

export const meltNative = {
  View: justChildren,
  Text: justChildren
};

export const replaceTransform = config => (accum, node, props, children) => {
  if (config[node.type] === undefined) {
    return {
      accum,
      node,
      props,
      children
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
    node: tNode,
    props: tProps,
    children: tChildren
  };
};

export default config => traverse(print, replaceTransform(config));
