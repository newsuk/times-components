import React from "react";
import { StyleSheet } from "react-native-web";
import omit from "lodash.omit";
import omitBy from "lodash.omitby";

const withoutProps = node => ({ ...node, props: {} });

const excludeProps = x => x === undefined || typeof x === "function";

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

function cleanClassNames(names) {
  const className = (names || "")
    .replace(/rn-[^-^ ]+-[^-^ ]+/g, "")
    .replace(/[ ]+/g, " ")
    .trim();

  return className.length ? { className } : {};
}

function transformRenderProps(propsToTransform, transformer) {
  return Object.entries(propsToTransform)
    .filter(([k, p]) => k !== "children" && React.isValidElement(p))
    .reduce(
      (transformed, [key, element]) => ({
        ...transformed,
        [key]: transformer(element)
      }),
      {}
    );
}

function transform(node) {
  if (!node || !node.props) return node;

  const { className, style: styles, ...props } = node.props;

  const children = (node.children || node.props.children || []).map(transform);

  const flattened = StyleSheet.flatten(styles);
  const style = Object.keys(flattened || {}).length ? { style: flattened } : {};

  return React.cloneElement(
    withoutProps(node),
    omitBy(
      {
        ...cleanSvgProps(node, props),
        ...transformRenderProps(props, transform),
        ...cleanClassNames(className),
        ...style
      },
      excludeProps
    ),
    ...children
  );
}

const test = value =>
  !!value && value.$$typeof === Symbol.for("react.test.json");

const print = (node, serialize) => serialize(transform(node));

module.exports = { test, print };
