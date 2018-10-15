import traverse from "./traverse";
import print from "./printers";

export const replacePropTransform = replacer => (
  accum,
  node,
  props,
  children
) => {
  const transformedProps = Object.entries(props).reduce(
    (tProps, [key, value]) => ({
      ...tProps,
      [key]: replacer(value, key)
    }),
    {}
  );

  return {
    accum,
    children,
    node,
    props: transformedProps
  };
};

export default (replacer = x => x) =>
  traverse(print, replacePropTransform(replacer));
