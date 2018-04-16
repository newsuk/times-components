import React from "react";
import { StyleSheet } from "react-native-web";
import omit from "lodash.omit";

function withoutProps(node) {
  return { ...node, props: {} };
}

function getType(node) {
  if (node.type instanceof Function) {
    return node.type.name.toLowerCase();
  }
  return node.type.toLowerCase();
}

function cleanSvgProps(node, props) {
  const type = getType(node);
  return type === "path" || type === "polygon" || type === "svg"
    ? omit(props, ["d", "path", "points", "viewBox"])
    : props;
}

function cleanClassNames(names) {
  const className = (names || "")
    .replace(/rn-[^-]+-[^- ]+/g, "")
    .replace(/[ ]+/g, " ")
    .trim();

  return className.length ? { className } : {};
}

function transform(node) {
  if (!node || !node.props) return node;

  const { className, style: styles, ...props } = { ...node.props };

  const children = []
    .concat(node.children || node.props.children)
    .map(transform);

  const flattened = StyleSheet.flatten(styles);
  const style = Object.keys(flattened || {}).length ? { style: flattened } : {};

  const transformRenderProps = propsToTransform =>
    Object.entries(propsToTransform)
      .filter(([k, p]) => k !== "children" && React.isValidElement(p))
      .reduce(
        (transformed, [key, element]) => ({
          ...transformed,
          [key]: transform(element)
        }),
        {}
      );

  return React.cloneElement(
    withoutProps(node),
    {
      ...cleanSvgProps(node, props),
      ...transformRenderProps(props),
      ...cleanClassNames(className),
      ...style
    },
    ...children
  );
}

function test(value) {
  return !!value && value.$$typeof === Symbol.for("react.test.json");
}

function print(node, serialize) {
  return serialize(transform(node));
}

module.exports = { test, print };
