import React from "react";

const withoutProps = node => ({ ...node, props: {} });

const isReactElement = ([key, value]) =>
  key !== "children" && React.isValidElement(value);

const mergeTransformation = (transform, transformElement) => (
  transformed,
  [key, prop]
) => {
  const { accum: propAccum, element } = transform(
    transformed.accum,
    transformElement,
    prop
  );

  return {
    accum: propAccum,
    props: {
      ...transformed.props,
      [key]: element
    }
  };
};

const transformRenderProps = (transform, accum, transformElement, props) => {
  const renderProps = Object.entries(props).filter(isReactElement);

  if (renderProps.length === 0) {
    return {
      accum,
      props
    };
  }

  return renderProps.reduce(mergeTransformation(transform, transformElement), {
    accum,
    props
  });
};

const transformChildren = (transform, transformElement) => (merged, child) => {
  const { accum, element } = transform(merged.accum, transformElement, child);

  return {
    accum,
    children: merged.children.concat(element)
  };
};

const transform = (accum, transformElement, node) => {
  if (!node || !node.props)
    return {
      accum,
      element: node
    };

  const { accum: childAccum, children } = []
    .concat(node.children || node.props.children || [])
    .reduce(transformChildren(transform, transformElement), {
      accum,
      children: []
    });

  const trp = transformRenderProps(
    transform,
    childAccum || accum,
    transformElement,
    node.props
  );

  const u = transformElement(
    trp.accum,
    withoutProps(node),
    trp.props,
    children
  );

  if (!u.node) {
    if (u.children) {
      return {
        accum: u.accum,
        element: u.children.length === 1 ? u.children[0] : u.children
      };
    }

    return {
      accum: u.accum,
      element: null
    };
  }

  return {
    accum: u.accum,
    element: React.cloneElement(u.node, u.props, ...u.children)
  };
};

const test = value =>
  !!value && value.$$typeof === Symbol.for("react.test.json");

const print = (printer, transformElement) => (node, serialize) => {
  const { accum, element } = transform({}, transformElement, node);

  return printer(serialize, accum, element);
};

module.exports = (printer, transformElement) => ({
  test,
  print: print(printer, transformElement)
});
