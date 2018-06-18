import React from "react";

const withoutProps = node => ({ ...node, props: {} });

const isReactElement = ([key, value]) =>
  key !== "children" && React.isValidElement(value);

const mergeTransformation = (transform, transformProps) => (
  transformed,
  [key, prop]
) => {
  const { accum: propAccum, element } = transform(
    transformed.accum,
    transformProps,
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

const transformRenderProps = (transform, accum, transformProps, props) => {
  const renderProps = Object.entries(props).filter(isReactElement);

  if (renderProps.length === 0) {
    return {
      accum,
      props
    };
  }

  return renderProps.reduce(mergeTransformation(transform, transformProps), {
    accum,
    props
  });
};

const transformChildren = (transform, transformProps) => (merged, child) => {
  const { accum, element } = transform(merged.accum, transformProps, child);

  return {
    accum,
    children: merged.children.concat(element)
  };
};

const transform = (accum, transformProps, node) => {
  if (!node || !node.props)
    return {
      accum,
      element: node
    };

  const { accum: childAccum, children } = (
    node.children ||
    node.props.children ||
    []
  ).reduce(transformChildren(transform, transformProps), {
    accum,
    children: []
  });

  const updated = transformProps(childAccum || accum, node);

  const transformedRenderProps = transformRenderProps(
    transform,
    updated.accum,
    transformProps,
    updated.props
  );

  return {
    accum: transformedRenderProps.accum,
    element: React.cloneElement(
      withoutProps(node),
      transformedRenderProps.props,
      ...children
    )
  };
};

const test = value =>
  !!value && value.$$typeof === Symbol.for("react.test.json");

const print = (transformProps, printer) => (node, serialize) => {
  const { accum, element } = transform({}, transformProps, node);

  return printer(serialize, accum, element);
};

module.exports = (transformProps, printer) => ({
  test,
  print: print(transformProps, printer)
});
