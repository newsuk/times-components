import omit from "lodash.omit";
import omitBy from "lodash.omitby";
import traverse from "./traverse";
import print from "./printers";

function getType({ type }) {
  if (type instanceof Function) {
    return type.name.toLowerCase();
  }
  if (typeof type === "string") {
    return type.toLowerCase();
  }
  return typeof type;
}

function cleanSvgProps(node, props) {
  const type = getType(node);
  return type === "path" || type === "polygon" || type === "svg"
    ? omit(props, ["d", "path", "points", "viewBox"])
    : props;
}

export const minimaliseTransform = excludeProps => (
  accum,
  node,
  props,
  children
) => {
  const { ...other } = props;

  return {
    accum,
    node,
    props: omitBy(
      {
        ...cleanSvgProps(node, other)
      },
      excludeProps
    ),
    children
  };
};

export default excludeProps =>
  traverse(print, minimaliseTransform(excludeProps));

const isEmptyObject = obj =>
  obj && typeof obj === "object" && Object.keys(obj).length === 0;

export const minimalWebTransform = minimaliseTransform(
  (value, key) =>
    value === undefined ||
    typeof value === "function" ||
    isEmptyObject(value) ||
    key === "dir"
);

export const minimalWeb = traverse(print, minimalWebTransform);

const redundantNativeKeys = new Set([
  "accessible",
  "allowFontScaling",
  "className",
  "ellipsizeMode",
  "href"
]);

export const minimalNativeTransform = minimaliseTransform(
  (value, key) =>
    value === undefined ||
    typeof value === "function" ||
    isEmptyObject(value) ||
    redundantNativeKeys.has(key)
);

export const minimalNative = traverse(print, minimalNativeTransform);
