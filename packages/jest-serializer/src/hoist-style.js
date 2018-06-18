import traverse from "./traverse";
import { stylePrinter } from "./printers";

export const hoistStyleTransform = (accum, node, props, children) => {
  const { style, className, ...other } = props;

  if (!style) {
    return {
      accum,
      node,
      props,
      children
    };
  }

  if (Object.keys(style).length === 0) {
    const omittedStyle = {
      ...other
    };

    if (className) {
      omittedStyle.className = className;
    }

    return {
      accum,
      node,
      props: omittedStyle,
      children
    };
  }

  const inlineStyleClass = `IS${Object.keys(accum.inlineStyles || {}).length +
    1}`;
  const newClassName = className
    ? `${className} ${inlineStyleClass}`
    : inlineStyleClass;

  return {
    accum: {
      ...accum,
      inlineStyles: {
        ...accum.inlineStyles,
        [inlineStyleClass]: style
      }
    },
    node,
    props: {
      className: newClassName,
      ...other
    },
    children
  };
};

export default traverse(stylePrinter, hoistStyleTransform);
