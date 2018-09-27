import omitBy from "lodash.omitby";
import traverse from "./traverse";
import print from "./printers";

export const minimaliseTransform = excludeProps => (
  accum,
  node,
  props,
  children
) => ({
  accum,
  node,
  props: omitBy(props, excludeProps),
  children
});

export default excludeProps =>
  traverse(print, minimaliseTransform(excludeProps));

const isEmptyObject = obj =>
  obj && typeof obj === "object" && Object.keys(obj).length === 0;

export const minimalWebTransform = minimaliseTransform(
  (value, key) =>
    value === undefined ||
    typeof value === "function" ||
    isEmptyObject(value) ||
    key === "dir" ||
    key === "data-focusable"
);

export const minimalWeb = traverse(print, minimalWebTransform);

const redundantNativeKeys = new Set([
  "accessible",
  "allowFontScaling",
  "className",
  "ellipsizeMode",
  "href",
  "isTVSelectable"
]);

export const minimalNativeTransform = minimaliseTransform(
  (value, key) =>
    value === undefined ||
    typeof value === "function" ||
    isEmptyObject(value) ||
    redundantNativeKeys.has(key)
);

export const minimalNative = traverse(print, minimalNativeTransform);
