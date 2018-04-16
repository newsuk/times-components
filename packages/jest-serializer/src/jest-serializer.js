import React from "react";
import { StyleSheet } from "react-native-web";
import omit from "lodash.omit";

function withoutProps(node) {
  return { ...node, props: {} };
}

function cleanSvgProps(node, props) {
  return node.type.toString().toLowerCase() == "path" ||
    node.type.toString().toLowerCase() == "polygon" ||
    node.type.toString().toLowerCase() == "svg"
    ? omit(props, ["d", "path", "points", "viewBox"])
    : props;
}

function transformRenderProps(props) {
  return Object.entries(props)
    .filter(([k, p]) => React.isValidElement(p))
    .reduce((props, [key, element]) => ({...props, [key]: element }), {});
}

function cleanClassNames(names) {
  const className = (names||'')
    .replace(/rn-[^-]+-[^- ]+/g, '')
    .replace(/[ ]+/g,' ')
    .trim();

  return (className.length)
    ? {className}
    : {};

}

function transform(node) {
  if (!node || !node.props) return node;

  const { className, style: styles, ...props } = { ...node.props };

  const children = []
    .concat(node.children || node.props.children)
    .map(transform);

  const flattened = StyleSheet.flatten(styles);
  const style = Object.keys(flattened || {}).length ? { style: flattened } : {};

  return React.cloneElement(
    withoutProps(node), {
      ...cleanSvgProps(node, props),
      ...transformRenderProps(props),
      ...style,
      ...cleanClassNames(className)
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
